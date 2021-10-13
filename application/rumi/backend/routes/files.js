var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/download', function(req, res, next) {
    let name = req.query.name;
    const file = `${__dirname}/../public/upload/` + name;
    console.log(`${__dirname}`)
    res.download(file); 
});

module.exports = router;
