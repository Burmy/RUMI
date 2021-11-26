var express = require("express");
const { authentication } = require("../middleware/authetication");
var router = express.Router();
var FavoriteModel = require("../models/favorites");

router.get("/", authentication, function (req, res, next) {
    let loginUserId = req.headers.loginUserId;
    let isAdmin = req.headers.admin;
    let id = req.query.id;
    let post_id = req.query.post_id;
    let saved_by = req.query.saved_by;

<<<<<<< HEAD
    if (!id || !post_id || !saved_by) {
        return res.status(400).send({ message: "id/post_id/save_id should not be null" });
    }

    if (!isAdmin && saved_by != loginUserId) {
        return res.status(401).send({ message: "Yon have no privilege to delete this user." });
    }
=======
  if (!isAdmin && saved_by != loginUserId) {
    return res
      .status(401)
      .send({ message: "Yon have no privilege to delete this user." });
  }
>>>>>>> master

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

router.post("/", authentication, function (req, res, next) {
    let loginUserId = req.headers.loginUserId;
    let isAdmin = req.headers.admin;
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

    if (!isAdmin && saved_by != loginUserId) {
        return res.status(401).send({ message: "Yon have no privilege to save this room." });
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

router.delete("/", authentication, function (req, res, next) {
    let loginUserId = req.headers.loginUserId;
    let isAdmin = req.headers.admin;
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ message: "id should not be null" });
    }

    if (!isAdmin && saved_by != loginUserId) {
        return res.status(401).send({ message: "Yon have no privilege to delete this user." });
    }

    FavoriteModel.delete(id)
        .then((isPostUnsaved) => {
            if (isPostUnsaved) {
                res.send({
                    message: `Post is unsaved`,
                });
            } else {
                res.status(400).send({
                    message: `id not found`,
                });
            }
        })
        .catch((err) => next(err));
});

module.exports = router;
