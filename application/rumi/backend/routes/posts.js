var express = require('express');
var router = express.Router();
var db = require("../conf/database");

/* GET home page. */
// TODO Converted to an async function.
router.get('/', function(req, res, next) {
  let searchText = req.query.search;
  // res.send("Hello posts.");
  let baseSQL = `SELECT * FROM post WHERE caption like ?`;

  let sqlReadySearchText = "%" + searchText + "%"

  db.execute(baseSQL, [sqlReadySearchText])
    .then(([results, fields]) => {
      if (results && results.length) {
        res.send({
          resultsStatus: "info",
          message: `${results.length} result found`,
          results: results,
        });
      } else {
        res.send("No results.");
        // PostModel.getNRecentPosts(10).then((results) => {
        //   res.send({
        //     resultsStatus: "info",
        //     message: "No results, return the 10 most recent posts.",
        //     results: results,
        //   });
        // });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
