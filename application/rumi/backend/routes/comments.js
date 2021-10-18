var express = require('express');
var router = express.Router();
var CommentModel = require("../models/comments");

router.get('/', function(req, res, next) {
  res.send('comments API path');
});

module.exports = router;
