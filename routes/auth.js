const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    // Generate salt and hash for the new user's password
    const saltRounds = 10; // Number of salt rounds to use
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new user to the database
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json({ error: "user not found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(404).json({ error: "password" });
    const { isAdmin, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
