const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  keywords: [{ type: String }],
  text: {
    type: String,
    required: true,
  },
});

PostSchema.virtual("commentsUri").get(function () {
  return `/comments/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
