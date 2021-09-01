const { getNRecentPosts, getPostById } = require("../models/Posts");
const { getComments } = require("../models/Comments");
const postsMiddleware = {};

postsMiddleware.getRecentPosts = function (req, res, next) {
  let results = getNRecentPosts(10)
    .then((results) => {
      res.locals.results = results;
      if (results.length == 0) {
        req.flash("error", "There are no post created yet");
      }
      next();
    })
    .catch((err) => next(err));
};

postsMiddleware.getPostById = function (req, res, next) {
  try {
    let postId = req.params.id;
    getPostById(postId).then((result) => {
      if (result) {
        res.locals.currentPost = result;
        next();
      } else {
        req.flash("error", "this is not the post you are looking for");
        res.redirect("/");
      }
    });
  } catch (err) {
    next(err);
  }
};

postsMiddleware.getCommentsByPostId = function (req, res, next) {
  let postId = req.params.id;
  getComments(postId)
    .then((results) => {
      results.forEach((comment) => {
        comment.create_time = new Date(comment.create_time).toLocaleString();
      });
      res.locals.currentPost.comments = results;
      next();
    })
    .catch((err) => next(err));
};

module.exports = postsMiddleware;
