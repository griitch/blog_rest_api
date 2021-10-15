const express = require("express");
const Router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/*
@route : POST /users
@desc : create a new users
@access : public
*/
Router.post("/", async (req, res) => {
  const foo = await User.find({ username: req.body.username });
  if (foo) {
    res.json({
      err: true,
      message: "username already exists",
    });
  } else {
    const hash = await bcrypt.hash(req.body.password, 5);
    const newuser = new User({
      username: req.body.username,
      passwordHash: hash,
    });
    await newuser.save();
    res.json({
      message: "user created",
    });
  }
});

module.exports = Router;
