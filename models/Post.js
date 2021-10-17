const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    keywords: [{ type: String }],
    description: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.virtual("commentsUri").get(function () {
  return `/comments/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
