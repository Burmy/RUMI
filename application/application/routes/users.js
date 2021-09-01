var express = require("express");
var router = express.Router();
var db = require("../conf/database");
const UserModel = require("../models/Users");
var UserError = require("../helpers/error/UserError");
// var errorPrint = require("../helpers/debug/debugPrinters").errorPrint;
// var successPrint = require("../helpers/debug/debugPrinters").successPrint;
const {
  successPrint,
  errorPrint,
  requestPrint,
} = require("../helpers/debug/debugPrinters");
var bcrypt = require("bcrypt");
const { json } = require("express");

/* GET users listing. */
router.get("/allUser", function (req, res, next) {
  db.query("select * from user;").then(([results, field]) => {
    res.send(results);
  });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/registration", function (req, res, next) {
  res.render("registration", { title: "Registration" });
});

router.post("/registration", function (req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;


  let emailRegex ="^\w{1,63}@[a-zA-Z0-9]{2,63}\.[a-zA-Z]{2,63}(\.[a-zA-Z]{2,63})?$";
  var eight = password.length >= 8;
  var upper = /^[A-Z].*/.test(password);
  var number = /.*\d.*/.test(password);
  var special = /.*[/*\-+!@#$^&].*/.test(password);

  if(username ==null||!/^[a-zA-Z].*/.test(username)|| username.length<3) {
    next("invalid username");
  } else if (!/^\w{1,63}@[a-zA-Z0-9]{2,63}\.[a-zA-Z]{2,63}(\.[a-zA-Z]{2,63})?$/.test(email)) {
    next("invalid email");
  } else if (!eight||!upper||!number||!special) {
    next("invalid password");
  }


  UserModel.usernameExists(username)
    .then((usernameExists) => {
      if (usernameExists) {
        throw new UserError("this username exists.", "/users/registration", 400);
      } else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailExists) => {
      if (emailExists) {
        throw new UserError("this email exists.", "/users/registration", 400);
      } else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        throw new UserError("Internal Server Error", "/users/registration", 500);
      } else {
        successPrint("Succeed to add an user!");
        req.flash("success", "User accound has been created.");
        res.redirect("/users/login");
      }
    })
    .catch((err) => {
      errorPrint("user could not made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash("error", err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });
});

router.post("/login", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let userId;

  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if(loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.flash("success", "You have been successfully logged in.");
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        res.redirect("/");
      } else {
        throw new UserError("invalid username/password", "/users/login", 400);
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash("error", err.getMessage());
        res.status(err.getStatus);
        res.redirect("/users/login");
      } else {
        next(err);
      }
    });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint("session could not be destroyed");
      next(err);
    } else {
      successPrint("session was destroyed");
      res.clearCookie("csid"); // why? to know
      res.json({ status: "ok", message: "user is logged out." });
    }
  });
});

module.exports = router;
