var express = require("express");
var router = express.Router();
var PostModel = require("../models/posts");

// TODO Converted to an async function.
router.get("/", function (req, res, next) {
  let searchTerm = req.query.search;
  let location = req.query.location;
  let major = req.query.major;
  let pricefrom = req.query.pricefrom;
  let priceto = req.query.priceto;

  PostModel.search(searchTerm, location, major, pricefrom, priceto)
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
          message: `0 result found`,
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
