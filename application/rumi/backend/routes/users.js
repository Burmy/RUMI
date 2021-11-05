var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");
var bcrypt = require("bcrypt");
const { json } = require("express");
var UserError = require("../helpers/error/UserError");

router.get("/", function (req, res, next) {
  let id = req.query.id;
  if (id) {
    UserModel.getById(id)
      .then((results) => {
        if (results && results.length) {
          res.send({
            resultsStatus: "info",
            message: `${results.length} result found`,
            results: results,
          });
        } else {
          res.send({
            resultsStatus: "info",
            message: `Cannot find any user by id ${id}`,
          });
        }
      })
      .catch((err) => next(err));
    return;
  }

  let searchTerm = req.query.search;
  let major = req.query.major;
  let school = req.query.school;
  let pet = req.query.pet;
  let smoker = req.query.smoker;
  let gender = req.query.gender;
  let page = req.query.page;
  let size = req.query.size;

  UserModel.search(searchTerm, major, school, pet, smoker, gender, page, size)
    .then((results) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} result found`,
          results: results,
        });
      } else {
        res.send({
          resultsStatus: "info",
          message: `Cannot find any user`,
        });
      }
    })
    .catch((err) => next(err));
});

router.post("/registration", function (req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let description = req.body.description;
  let gender = req.body.gender;
  let school = req.body.school;
  let major = req.body.major;
  let smoker = req.body.smoker;
  let pets = req.body.pets;

  if (!username || !username.length) {
    return res.status(400).send({ message: "username should not be null" });
  }
  if (!email || !email.length) {
    return res.status(400).send({ message: "email should not be null" });
  }
  if (!password || !password.length) {
    return res.status(400).send({ message: "password should not be null" });
  }
  if (!description || !description.length) {
    return res.status(400).send({ message: "Description should not be null" });
  }
  if (!gender || !gender.length) {
    return res.status(400).send({ message: "gender should not be null" });
  }
  if (!school || !school.length) {
    return res.status(400).send({ message: "school should not be null" });
  }
  if (!major || !major.length) {
    return res.status(400).send({ message: "major should not be null" });
  }
  if (!smoker || !smoker.length) {
    return res.status(400).send({ message: "smoker should not be null" });
  }
  if (!pets || !pets.length) {
    return res.status(400).send({ message: "pets should not be null" });
  }

  let emailRegex =
    "^w{1,63}@[a-zA-Z0-9]{2,63}.[a-zA-Z]{2,63}(.[a-zA-Z]{2,63})?$";
  var eight = password.length >= 8;
  var upper = /^[A-Z].*/.test(password);
  var number = /.*\d.*/.test(password);
  var special = /.*[/*\-+!@#$^&].*/.test(password);

  if (
    username == null ||
    !/^[a-zA-Z].*/.test(username) ||
    username.length < 3
  ) {
    next("invalid username");
  } else if (
    !/^\w{1,63}@[a-zA-Z0-9]{2,63}\.[a-zA-Z]{2,63}(\.[a-zA-Z]{2,63})?$/.test(
      email
    )
  ) {
    next("invalid email");
  }

  UserModel.usernameExists(username)
    .then((usernameExists) => {
      if (usernameExists) {
        throw new UserError("username exists", 400);
      } else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailExists) => {
      if (emailExists) {
        throw new UserError("email exists", 400);
      } else {
        return UserModel.create(
          username,
          password,
          email,
          description,
          gender,
          school,
          major,
          smoker,
          pets
        );
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        res.status(500).send("Internal server error1");
      } else {
        return res.send({
          message: "registration secceed!",
        });
      }
    })
    .catch((err) => {
      if (err instanceof UserError) {
        res.status(400).send(err.getMessage());
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
      if (loggedUserId > 0) {
        console.log(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        res.cookie('loggedUserid', loggedUserId);
        res.cookie('username', username);
        res.cookie('logged', true);
        res.send({ message: `${username} is logged in` });
      } else {
        throw new UserError("invalid username/password", "/users/login", 400);
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.patch("/user/:id", function (req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let description = req.body.description;
  let gender = req.body.gender;
  let school = req.body.school;
  let major = req.body.major;
  let smoker = req.body.smoker;
  let pets = req.body.pets;
  const changes = req.body;

  const original = retrieveOriginal(
    username,
    email,
    password,
    description,
    gender,
    school,
    major,
    smoker,
    pets
  )

  if (changes === changes) {
    return res.status(400).send({ message: " Nothing"})
  }

});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("session could not be destroyed");
      next(err);
    } else {
      console.log("session was destroyed");
      res.clearCookie("csid");
      res.clearCookie("username");
      res.clearCookie("logged");
      res.json({ status: "ok", message: "user is logged out." });
    }
  });
});

module.exports = router;
