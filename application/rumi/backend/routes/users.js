var express = require("express");
var router = express.Router();
var UserModel = require("../models/users");

router.get("/", function (req, res, next) {
  let id = req.query.id;

  if (!id) {
    return res.status(400).send({ message: "id should not be null" });
  }

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
});

module.exports = router;
