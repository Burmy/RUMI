var express = require("express");
var sharp = require("sharp");
var multer = require("multer");
var crypto = require("crypto");
var router = express.Router();
var PostModel = require("../models/posts");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split("/")[1];
    let randomName = crypto.randomBytes(22).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  },
});

var uploader = multer({ storage: storage });

router.get("/", function (req, res, next) {
  let searchTerm = req.query.search;
  let location = req.query.location;
  let pricefrom = req.query.pricefrom;
  let priceto = req.query.priceto;
  let parking = req.query.parking;
  let pet = req.query.pet;
  let smoking = req.query.smoking;
  let gender = req.query.gender;
  let page = req.query.page;
  let size = req.query.size;

  if (location) {
    location = location.split(" ");
  }

  PostModel.search(
    searchTerm,
    location,
    pricefrom,
    priceto,
    parking,
    pet,
    smoking,
    gender,
    page,
    size
  )
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

router.post("/", uploader.single("photo"), function (req, res, next) {
  let caption = req.body.caption;
  let description = req.body.description;
  let location = req.body.location;
  let price = req.body.price;
  let parking = req.body.parking;
  let pet = req.body.pet;
  let smoking = req.body.smoking;
  let gender = req.body.gender;
  let creator_id = req.body.creator_id;
  let photo = req.file.path;
  let photoName = req.file.filename;
  let thumbnail = `thumbnail-${photoName}`;
  let destinationOfThumbnail = req.file.destination + "/" + thumbnail;

  if (!caption || !caption.length) {
    return res.status(400).send({ message: "Caption should not be null" });
  }
  if (!description || !description.length) {
    return res.status(400).send({ message: "Description should not be null" });
  }
  if (!location || !location.length) {
    return res.status(400).send({ message: "Location should not be null" });
  }
  if (!price || !price.length) {
    return res.status(400).send({ message: "Price should not be null" });
  }
  if (!creator_id || !creator_id.length) {
    return res.status(400).send({ message: "Creator_id should not be null" });
  }
  if (!photo || !photo.length) {
    return res.status(400).send({ message: "Photo should not be null" });
  }

  sharp(photo)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(() => {
      return PostModel.create(
        caption,
        description,
        photoName,
        thumbnail,
        location,
        price,
        parking,
        pet,
        smoking,
        gender,
        creator_id
      );
    })
    .then((results) => {
      if (results && results.affectedRows) {
        res.send({
          id: results.insertId,
          message: `Post is created`,
        });
      } else {
        res.status(400).send({
          message: `Failed`,
        });
      }
    })
    .catch((err) => next(err));
});

router.delete("/", function (req, res, next) {
  let id = req.body.id;
  PostModel.delete(id)
    .then((isPostDeleted) => {
      if (isPostDeleted) {
        res.send({ message: `Post is deleted` });
      } else {
        res.status(400).send({
          message: `id not found`,
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
