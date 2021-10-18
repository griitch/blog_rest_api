const express = require("express");
const Router = express.Router();
const Comment = require("../models/Comment");

/*
@route : GET /comments/:postId
@desc : get all comments of the specified post
@access : public
*/
Router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).populate(
    "userId",
    "username"
  );
  res.json(comments);
});

/*
@route : POST /comments/:postId
@desc : put a comments of the specified post
@access : private
*/
Router.post("/:postId", (req, res) => {
  req._passport.instance.authenticate(
    "jwt",
    { session: false },
    async (err, user) => {
      if (err || !user) {
        res.status(402).json({ err: true, message: "Not authentified" });
      } else {
        try {
          const newComment = new Comment({
            userId: user.id,
            postId: req.params.postId,
            comment: req.body.comment,
          });
          await newComment.save();
          res.json({ message: "comment added" });
        } catch (e) {
          res.json({ error: true, message: "error somwhere" });
        }
      }
    }
  )(req, res);
});

module.exports = Router;
