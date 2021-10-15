require("dotenv").config();
const express = require("express");

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comment");
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");

//passport stuff
const jwtStrategy = require("./jwtstrategy");
const passport = require("passport");
passport.use(jwtStrategy);

const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.mongodb)
  .then(() => console.log("connected to mongodb"))
  .catch(console.log);

const app = express();
app.use(express.json());

app.use(passport.initialize());

app.use("/posts", postsRouter);
app.use("/comment", commentsRouter);
app.use("/users", usersRouter);

// dummy protected route to test auth

app.post("/profile", (req, res) => {
  passport.authenticate("jwt", (err, user) => {
    if (!user) res.send("not auth");
    else {
      res.json(user);
    }
  })(req, res);
});

app.post("/login2", (req, res) => {
  let { username } = req.body;
  const token = jwt.sign({ username }, process.env.secret);
  res.json({ message: "auth good", token });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
