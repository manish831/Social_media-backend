const mongoose = require("mongoose");

// Define the schema for the "Post" object
const PostSchema = new mongoose.Schema(
  {
    // userId field stores the ID of the user who created the post
    userId: {
      type: String,
      required: true, // The field is required, every post must have a user ID
    },
    // desc field stores the description of the post, limited to 500 characters
    desc: {
      type: String,
      max: 500, // Maximum allowed length for the description
    },
    // img field stores the URL or path of an image associated with the post
    img: {
      type: String,
    },
    // likes field stores an array of user IDs who have liked the post, default is an empty array
    likes: {
      type: Array,
      default: [], // The default value for the likes field is an empty array
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields to track creation and updates
);

// Create a Mongoose model named "Post" using the defined schema
const Post = mongoose.model("Post", PostSchema);

// Export the "Post" model to be used in other parts of the application
module.exports = Post;
