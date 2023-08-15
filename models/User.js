const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: "string",
      required: true,
      min: 3,
      max: 30,
      unique: true,
    },
    email: {
      type: "string",
      required: true,
      max: 30,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      min: 6,
    },
    desc: {
      type: "string",
      min: 6,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
