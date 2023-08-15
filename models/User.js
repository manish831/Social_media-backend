const mongoose = require("mongoose");

// Define the schema for the "User" object
const userSchema = new mongoose.Schema(
  {
    // username field stores the username of the user
    username: {
      type: String,
      required: true, // The field is required, every user must have a username
      min: 3, // Minimum length of the username
      max: 30, // Maximum length of the username
      unique: true, // Username must be unique
    },
    // email field stores the email of the user
    email: {
      type: String,
      required: true, // The field is required, every user must have an email
      max: 30, // Maximum length of the email
      unique: true, // Email must be unique
    },
    // password field stores the password of the user
    password: {
      type: String,
      required: true, // The field is required, every user must have a password
      min: 6, // Minimum length of the password
    },
    // desc field stores a description or bio of the user
    desc: {
      type: String,
      min: 6, // Minimum length of the description
    },
    // followers field stores an array of user IDs who follow this user, default is an empty array
    followers: {
      type: Array,
      default: [], // Default value for the followers array is an empty array
    },
    // following field stores an array of user IDs that this user follows, default is an empty array
    following: {
      type: Array,
      default: [], // Default value for the following array is an empty array
    },
    // isAdmin field indicates whether the user is an admin, default is false
    isAdmin: {
      type: Boolean,
      default: false, // Default value for isAdmin is false
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields to track creation and updates
);

// Create a Mongoose model named "User" using the defined schema
const User = mongoose.model("User", userSchema);

// Export the "User" model to be used in other parts of the application
module.exports = User;
