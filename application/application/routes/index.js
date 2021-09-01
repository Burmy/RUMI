var express = require("express");
var router = express.Router();
const db = require("../conf/database");
var isLoggedIn = require("../middleware/routeProtectors").userIsLoggedIn;
var {
  getRecentPosts,
  getPostById,
  getCommentsByPostId,
} = require("../middleware/postsmiddleware");

/* GET home page. */

router.get("/", getRecentPosts, function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.use("/postImage", isLoggedIn);
router.get("/postimage", function (req, res, next) {
  res.render("postimage", { title: "Post your image" });
});

router.get("/imagepost", function (req, res, next) {
  res.render("imagepost", { title: "Posts" });
});

router.get(
  "/post/:id(\\d+)",
  getPostById,
  getCommentsByPostId,
  (req, res, next) => {
    res.render("imagepost", { title: `${res.locals.currentPost.title}` });
  }
);

module.exports = router;
