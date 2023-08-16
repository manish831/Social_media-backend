const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    if (req.body.userId === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        try {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(
            req.body.password,
            saltRounds
          );
          req.body.password = hashedPassword;
        } catch (err) {
          return res.status(500).json(err);
        }
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true } // Return the updated user after the update
        );

        res.status(200).json("Account has been updated successfully");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can only update your account");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete your account
router.delete("/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);

    if (!currentUser) {
      return res.status(404).json("User not found");
    }

    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err); // Corrected error handling here
      }
    } else {
      return res.status(403).json("You can only delete your account");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // This line uses object destructuring to extract properties from the user._doc object,
    // I want to exclude the 'password' and 'updatedAt' properties from response.
    const { password, updatedAt, ...other } = user._doc;
    // The rest of the properties are collected into the other object.
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Express route to handle the action of following a user
router.put("/:id/follow", async (req, res) => {
  // Check if the user is not trying to follow themselves
  if (req.body.userId !== req.params.id) {
    try {
      // Find the user to be followed by their ID
      const user = await User.findById(req.params.id);

      // Find the current user who wants to follow
      const currentUser = await User.findById(req.body.userId);

      // Check if the current user is not already following the user
      if (!user.followers.includes(req.body.userId)) {
        // Update the user to be followed: add the current user to their followers
        await user.updateOne({ $push: { followers: req.body.userId } });

        // Update the current user: add the followed user to their following list
        await currentUser.updateOne({ $push: { following: req.params.id } });

        // Respond with a success message
        res
          .status(200)
          .json({ message: "User has been followed successfully" });
      } else {
        // If the current user is already following, respond with a message
        res
          .status(403)
          .json({ message: "You are already following this user" });
      }
    } catch (err) {
      // If an error occurs during the process, respond with an error message
      res.status(500).json(err);
    }
  } else {
    // If the user is trying to follow themselves, respond with a message
    res.status(403).json({ message: "You cannot follow yourself" });
  }
});

//unfollow the user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });

        
        await currentUser.updateOne({ $pull: { following: req.params.id } });

        
        res
          .status(200)
          .json({ message: "User has been unfollowed successfully" });
      } else {
        
        res
          .status(403)
          .json({ message: "You are already not following this user" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You cannot unfollow yourself" });
  }
});


module.exports = router;
