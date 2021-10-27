var express = require('express');
var router = express.Router();
var ListModel = require("../models/list");

/* GET list. */
// TODO Converted to an async function.
router.get('/', function(req, res, next) {
  let category = req.query.category;

  ListModel.query(category)
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
