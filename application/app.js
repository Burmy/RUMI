var express = require('express');
var app = express();

// app.use('/public/css', express.static('css'));

// process.env.PWD = process.cwd()
// app.use(express.static(process.env.PWD + '/public'));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/about.html");
});

app.get('/members', function(req, res) {
    var name = req.query.name
    res.sendFile(__dirname + "/views/members/" + name + ".html");
});

module.exports = app;