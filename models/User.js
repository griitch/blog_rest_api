const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
