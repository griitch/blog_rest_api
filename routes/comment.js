const express = require("express");
const Router = express.Router();
const Comment = require("../models/Comment");

/*
@route : GET /comments/:postId
@desc : get all comments of the specified post
@access : public
*/
Router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({
    $eq: { postId: req.params.postId },
  });
  res.json(comments);
});

/*
@route : POST /comments/:postId
@desc : put a comments of the specified post
@access : private
*/
Router.post(":postId", async (req, res) => {
  res.json({
    foo: "route to post a new comment, gotta first check if user is auth and then post the comm",
  });
});

module.exports = Router;
