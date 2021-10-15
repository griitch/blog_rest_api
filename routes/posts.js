const express = require("express");
const Router = express.Router();
const Post = require("../models/Post");

/*
@route : GET /posts
@desc : get all posts
@access : public
*/
Router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

/*
@route : GET /posts/:id
@desc : get a specific post by its id
@access : public
*/
Router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) res.json(post);
    else
      res.json({
        err: true,
        message: "post not found",
      });
  } catch (err) {
    res.json({
      err: true,
      message: "bad request",
    });
  }
});

/*
@route : POST /posts/
@desc : create a post
@access : private
*/

Router.post("/", (req, res) => {
  req._passport.instance.authenticate(
    "jwt",
    { session: false },
    async (err, user) => {
      if (err || !user) {
        res.status(402).json({ err: true, message: "Not authentified" });
      } else if (user.admin) {
        try {
          const post = new Post({
            title: req.body.title,
            text: req.body.text,
            keywords: [...req.body.keywords],
          });
          await post.save();
          res.json({ message: "added successfully" });
        } catch (err) {
          res.json({ err: true, message: "error somewhere" });
        }
      } else {
        res.json({ err: true, message: "not admin" });
      }
    }
  )(req, res);
});

/*
@route : PUT /posts/:id
@desc : update a post
@access : private
*/
Router.put("/:id", (req, res) => {
  req._passport.instance.authenticate(
    "jwt",
    { session: false },
    async (err, user) => {
      if (err || !user) {
        res.status(402).json({ err: true, message: "Not authentified" });
      } else if (user.admin) {
        try {
          const post = await Post.findByIdAndUpdate(req.params.id, {
            $set: { text: req.body.text },
          });
          if (!post) {
            res.json({ err: true, message: "post not found" });
          } else {
            res.json({ message: "updated successfully" });
          }
        } catch (err) {
          res.json({ err: true, message: "error somewhere" });
        }
      } else {
        res.json({ err: true, message: "not admin" });
      }
    }
  )(req, res);
});

/*
@route : DELETE /posts/:id
@desc : delete a post
@access : private
*/

Router.delete(":/id", (req, res) => {
  req._passport.instance.authenticate(
    "jwt",
    { session: false },
    async (err, user) => {
      if (err || !user) {
        res.status(402).json({ err: true, message: "Not authentified" });
      } else if (user.admin) {
        try {
          const post = await Post.findByIdAndDelete(req.params.id);
          if (!post) {
            res.json({ err: true, message: "post not found" });
          } else {
            res.json({ message: "deleted successfully" });
          }
        } catch (err) {
          res.json({ err: true, message: "bad request" });
        }
      } else {
        res.json({ err: true, message: "not admin" });
      }
    }
  )(req, res);
});

module.exports = Router;
