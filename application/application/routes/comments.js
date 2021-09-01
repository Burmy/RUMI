var express = require("express");
var router = express.Router();
var db = require("../conf/database");
const {
  successPrint,
  errorPrint,
  requestPrint,
} = require("../helpers/debug/debugPrinters");
const { create } = require("../models/Comments");

router.post("/create", (req, res, next) => {
  if (!req.session.username) {
    errorPrint("Must be logged in to comment");
    res.json({
      code: -1,
      status: "danger",
      message: "Must be logged in to create a comment",
    });
  } else {
    let { comment, postId } = req.body;
    let username = req.session.username;
    let userId = req.session.userId;

    create(userId, postId, comment)
      .then((isSuccessful) => {
        if (isSuccessful != -1) {
          successPrint(`comment was created for ${username}`);
          res.json({
            code: 1,
            status: "success",
            message: "Commen created",
            comment: comment,
            username: username,
          });
        } else {
          errorPrint("comment was not saved");
          res.json({
            code: -1,
            status: "danger",
            message: "comment was not created",
          });
        }
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
