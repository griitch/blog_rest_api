const express = require("express");
const bcrypt = require("bcryptjs");
const Router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { secret } = process.env;

/*
@route : POST /login
@desc : login and return the jwt if authentified
@access : public
*/
Router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user)
      return res.json({ error: true, message: "No such userame exists" });

    const isMatching = await bcrypt.compare(password, user.passwordHash);
    if (isMatching) {
      const token = jwt.sign(username, secret, {});
      res.json({
        token,
        message: "authentication passed",
        username,
        admin: user.admin,
      });
    } else {
      res.json({ error: true, message: "wrong password" });
    }
  } catch (e) {
    res.json(e);
  }
});

/*
@route: POST /login/auth
@desc: verify if the jwt is valid
@access : public
*/
Router.post("/auth", (req, res) => {
  req._passport.instance.authenticate(
    "jwt",
    { session: false },
    async (err, user) => {
      if (err || !user) {
        res.json({ error: true, message: "invalid credentials" });
      } else {
        res.json({ user: user.username, message: "valid jwt" });
      }
    }
  )(req, res);
});

module.exports = Router;
