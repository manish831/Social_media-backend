// Import required modules
const express = require("express"); // Framework for building web applications
const app = express(); // Create an instance of the Express application
const mongoose = require("mongoose"); // MongoDB ODM library
const dotenv = require("dotenv"); // Load environment variables from a file
const helmet = require("helmet"); // Middleware for adding security headers
const morgan = require("morgan"); // HTTP request logger
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Load environment variables from a .env file if needed
dotenv.config();
// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new server discovery and monitoring engine
  })
  .then(() => {
    console.log("Connected to MongoDB"); // Connection successful
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error); // Handle connection error
  });


  //middleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));
  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/posts", postRoute);
  app.get("/", (req, res) => {
    res.send("Welcome to home page ");
  })
  

const port = 8800; // Port number to listen on
// Start the Express server
app.listen(port, () => {
  console.log(`Listening on ${port}`); // Display a message when the server starts
});


