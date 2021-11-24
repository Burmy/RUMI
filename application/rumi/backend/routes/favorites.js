var express = require("express");
var router = express.Router();
var FavoriteModel = require("../models/favorites");

router.get("/", function (req, res, next) {
    let id = req.query.id;
    let post_id = req.query.post_id;
    let saved_by = req.query.saved_by;

    FavoriteModel.search(id, post_id, saved_by)
        .then((results) => {
            if (results && results.length) {
                res.send({
                    resultsStatus: "info",
                    message: `${results.length} post found`,
                    results: results,
                });
            } else {
                res.send({
                    resultsStatus: "info",
                    message: `0 post found`,
                });
            }
        })
        .catch((err) => next(err));
});

router.post("/", function (req, res, next) {
    let post_id = req.body.post_id;
    let saved_by = req.body.saved_by;

    if (!post_id) {
        return res.status(400).send({
            message: "post_id should not be null",
        });
    }
    if (!saved_by) {
        return res.status(400).send({
            message: "saved_by should not be null",
        });
    }

    return FavoriteModel.create(post_id, saved_by)
        .then((results) => {
            if (results && results.affectedRows) {
                res.send({
                    id: results.insertId,
                    message: `Post saved as favorite`,
                });
            } else {
                res.status(400).send({
                    message: `Post could not be saved as favorite`,
                });
            }
        })
        .catch((err) => next(err));
});

module.exports = router;
