var express = require('express');
var router = express.Router();
var db = require("../conf/database");

/* GET posts. */
// TODO Converted to an async function.
router.get('/', function(req, res, next) {
  let searchText = req.query.search;
  let location = req.query.location;
  let major = req.query.major;
  let pricefrom = req.query.pricefrom;
  let priceto = req.query.priceto;

  let sqlReadySearchText = "%" + searchText + "%";

  parameters = [sqlReadySearchText]

  let baseSQL = `SELECT p.* 
                FROM post p 
                JOIN user u
                ON u.id = p.creator_id
                WHERE p.caption like ? `
  if (location) {
    baseSQL += ` AND p.location = ? `;
    parameters.push(location);
  }
  if (major) {
    baseSQL += ` AND u.major = ? `;
    parameters.push(major);
  }
  if (pricefrom) {
    baseSQL += ` AND p.price >= ? `;
    parameters.push(pricefrom);
  }
  if (priceto) {
    baseSQL += ` AND p.price <= ? `;
    parameters.push(priceto);
  }

  console.log(parameters);
  console.log(baseSQL);


  db.execute(baseSQL, parameters)
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
