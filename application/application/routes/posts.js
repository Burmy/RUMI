var express = require("express");
var router = express.Router();
var db = require("../conf/database");
const {
  successPrint,
  errorPrint,
  requestPrint,
} = require("../helpers/debug/debugPrinters");
var sharp = require("sharp");
var multer = require("multer");
var crypto = require("crypto");
var PostError = require("../helpers/error/PostError");
var PostModel = require("../models/Posts");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    successPrint("destination");
    cb(null, "public/images/uploads");
  },
  filename: function (req, file, cb) {
    successPrint("file name");
    let fileExt = file.mimetype.split("/")[1];
    let randomName = crypto.randomBytes(22).toString("hex");
    cb(null, `${randomName}.${fileExt}`);
  },
});

var uploader = multer({ storage: storage });

router.post("/createPost", uploader.single("uploadImage"), (req, res, next) => {
  let fileUploaded = req.file.path;
  let fileAsThumbnail = `thumbnail-${req.file.filename}`;
  let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
  let title = req.body.title;
  let description = req.body.description;
  let fk_userId = req.session.userId;

  if (fileUploaded == null || fileUploaded.length == 0) {
    next("file path should not be empty");
  } else if (req.file.filename == null || req.file.filename.length == 0) {
    next("file name should not be empty");
  } else if (title == null || title.length == 0) {
    next("post title should not be empty");
  } else if (description == null || description.length == 0) {
    next("post description should not be empty");
  } else if (fk_userId == null || !/^\d+$/.test(fk_userId)) {
    next("invalid userId");
  }

  sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(() => {
      return PostModel.create(
        title,
        description,
        fileUploaded,
        destinationOfThumbnail,
        fk_userId
      );
    })
    .then((isPostCreated) => {
      if (isPostCreated) {
        req.flash("success", "Your post was created successfully!");
        res.redirect("/");
      } else {
        throw new PostError("Post could not be created!", "/postImage", 400);
      }
    })
    .catch((err) => {
      if (err instanceof PostError) {
        errorPrint(err.getMessage());
        req.flash("error", err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });
});

router.get("/search", async (req, res, next) => {
  let searchTerm = req.query.search;
  if (!searchTerm) {
    res.send({
      resultsStatus: "info",
      message: "No search term given",
      results: [],
    });
  } else {
    PostModel.search(searchTerm)
      .then((results) => {
        if (results && results.length) {
          res.send({
            resultsStatus: "info",
            message: `${results.length} result found`,
            results: results,
          });
        } else {
          PostModel.getNRecentPosts(10).then((results) => {
            res.send({
              resultsStatus: "info",
              message: "No results, return the 10 most recent posts.",
              results: results,
            });
          });
        }
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
