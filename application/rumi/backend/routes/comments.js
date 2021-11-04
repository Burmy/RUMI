var express = require('express');
var router = express.Router();
var CommentModel = require("../models/comments");

router.get('/', function(req, res, next) {
  let id = req.query.id;
  let creator_id = req.query.creator_id;
  let post_id = req.query.post_id;

  CommentModel.search(
    id,
    creator_id,
    post_id,
  )
    .then((results) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} comment found`,
          results: results,
        });
      } else {
        res.send({
          resultsStatus: "info",
          message: `0 comment found`,
        });
      }
    })
    .catch((err) => next(err));

});

module.exports = router;
