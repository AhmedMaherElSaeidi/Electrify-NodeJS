const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/index");

// Table schema (for validating post, and put request)
const schema = Joi.object({
  fname: Joi.string().min(3).max(20).required(),
  lname: Joi.string().min(3).max(20).required(),
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().required(),
  telephone: Joi.string().min(11).max(11).required(),
  gender: Joi.string().required(),
  role: Joi.string().required(),
});
const query = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

const userProfile = (gender) => {
  return gender === "M"
    ? "default-male-avatar-profile.jpg"
    : "default-female-avatar-profiler.jpg";
};

// CRUD operations
router.get("/", async (req, res) => {
  const users = await User.findAll(query);
  res.status(201).json({ data: users });
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      ...query,
    });

    user
      ? res.status(201).json({ data: user })
      : res.status(404).json({ message: "User with given ID wasn't found" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    let user = req.body;

    // Validate data
    const { error } = schema.validate(user);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Set user image
    user.image = user.image ? user.image : userProfile(user.gender);

    // Saving user
    user = await User.create(user);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let user = await User.findOne({
      where: { id: req.params.id },
    });

    if (user) {
      let user = req.body;

      // Validate data
      const { error } = schema.validate(user);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      // Set user image
      user.image = user.image ? user.image : userProfile(user.gender);

      // Updating user
      await User.update(user, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).json({ message: "Updated successfully." });
    }

    res.status(404).json({ message: "User with given ID wasn't found" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (user) {
      // Removing product image
      if (!user.image.includes("avatar-profile.jpg")) {
        // do sth..
        console.log("im here");
      }

      // Removing user
      await User.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ message: "Deleted successfully." });
    }

    res.status(404).json({ message: "User with given ID wasn't found" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
