var express = require('express');
var router = express.Router();
var UserModel = require("../models/users");

router.get('/', function(req, res, next) {
  res.send('users API path');
});

module.exports = router;
