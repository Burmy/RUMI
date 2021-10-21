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

  if (location) {
    location = location.split(" ");
  }
  if (major) {
    major = major.split(" ");
  }

  if (!searchTerm) {
    return res.status(400).send({ message: `Search term should not be null` });
  }

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

router.post("/", function (req, res, next) {
  let caption = req.body.caption;
  let description = req.body.description;
  let location = req.body.location;
  let price = req.body.price;
  let creator_id = req.body.creator_id;

  if (!caption) {
    return res.status(400).send({ message: "Caption should not be null" });
  }
  if (!description) {
    return res.status(400).send({ message: "Description should not be null" });
  }
  if (!location) {
    return res.status(400).send({ message: "Location should not be null" });
  }
  if (!price) {
    return res.status(400).send({ message: "Price should not be null" });
  }
  if (!creator_id) {
    return res.status(400).send({ message: "Creator_id should not be null" });
  }

  PostModel.create(
    caption,
    description,
    "",
    "",
    location,
    price,
    creator_id
  ).then((isPostCreated) => {
    if (isPostCreated) {
      res.send({
        message: `Post is created`,
      });
    } else {
      res.status(400).send({
        message: `Failed`,
      });
    }
  });
});

module.exports = router;
