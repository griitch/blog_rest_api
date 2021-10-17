require("dotenv").config();
const express = require("express");

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comment");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");

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
app.use(require("cors")());
app.use(express.json());

app.use(passport.initialize());

app.use("/posts", postsRouter);
app.use("/login", loginRouter);
app.use("/comments", commentsRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
