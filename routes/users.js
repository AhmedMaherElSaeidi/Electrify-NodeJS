const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Op } = require("sequelize");
const { User } = require("../models/index");
const Password = require("../services/Password");

// Table schema (for validating post, and put request)
const schema = {
  fname: Joi.string().min(3).max(20).required(),
  lname: Joi.string().min(3).max(20).required(),
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().required(),
  telephone: Joi.string().min(11).max(11).required(),
  gender: Joi.string().valid("M", "F").required(),
};
const post_schema = Joi.object(schema);
const put_schema = Joi.object({ ...schema, password: Joi.string() });
const query = {
  attributes: {
    exclude: ["password", "createdAt", "updatedAt"],
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
    res.status(400).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    let user = req.body;

    // Validate data
    const { error } = post_schema.validate(user);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Validating for existing username
    const _user = await User.findOne({ where: { username: user.username } });
    if (_user)
      return res.status(400).json({ message: "Username already exists.!" });

    // Set user attributes
    user.role = user.role ? user.role : "customer";
    user.password = await Password.hashPassword(user.password);
    user.image = user.image ? user.image : userProfile(user.gender);

    // Saving user
    user = await User.create(user);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let oldUser = await User.findOne({
      where: { id: req.params.id },
    });

    if (oldUser) {
      let user = req.body;

      // Validate data
      const { error } = put_schema.validate(user);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      // Validating for existing username
      const _existing_username = await await User.findOne({
        where: {
          username: user.username,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });
      if (_existing_username)
        return res.status(400).json({ message: "Username already exists.!" });

      // Set user attributes
      user.image = user.image ? user.image : userProfile(user.gender);
      user.password = user.password
        ? await Password.hashPassword(user.password)
        : delete user.password;

      // Updating user
      if (oldUser.user === user.username) delete user.username;
      await User.update(user, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).json({ message: "Updated successfully." });
    }

    res.status(404).json({ message: "User with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
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
    res.status(400).json({ message: error });
  }
});

module.exports = router;
