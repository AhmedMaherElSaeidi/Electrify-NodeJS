const express = require("express");
const router = express.Router();
const Joi = require("joi");
const path = require("path");
const { Op } = require("sequelize");
const JWT = require("../services/JWT");
const File = require("../services/File");
const { User } = require("../models/index");
const Password = require("../services/Password");
const { authorized, authorizedAdmin } = require("../middlewares/authorization");

// Table schema (for validating post, and put request)
const schema = {
  fname: Joi.string().min(3).max(20).required(),
  lname: Joi.string().min(3).max(20).required(),
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
  telephone: Joi.string().min(11).max(11).required(),
  gender: Joi.string().valid("M", "F").required(),
  image: Joi.string(),
};
const post_schema = Joi.object(schema);
const put_schema = Joi.object({ ...schema, password: Joi.string() });
const query = {
  attributes: {
    exclude: ["password", "createdAt", "updatedAt"],
  },
};

const upload = File.uploadFile();
const defaultUserProfile = (gender) => {
  return gender === "M"
    ? "default-male-avatar-profile.jpg"
    : "default-female-avatar-profile.jpg";
};

// CRUD operations
router.get("/", authorized, authorizedAdmin, async (req, res) => {
  const users = await User.findAll(query);
  res.status(201).json({ data: users });
});

router.get("/:id", authorized, async (req, res) => {
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

router.post("/", upload.single("image"), async (req, res) => {
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
    user.image = req.file ? req.file.filename : defaultUserProfile(user.gender);

    // Saving user
    user = await User.create(user);
    const jwt = new JWT();

    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", authorized, upload.single("image"), async (req, res) => {
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
      const existing_username = await await User.findOne({
        where: {
          username: user.username,
          id: {
            [Op.ne]: req.params.id,
          },
        },
      });
      if (existing_username)
        return res.status(400).json({ message: "Username already exists.!" });

      // Set user profile
      user.image = req.file ? req.file.filename : oldUser.image;
      if (
        req.file &&
        oldUser.image &&
        !oldUser.image.includes("avatar-profile.jpg")
      ) {
        const oldImagePath = path.join(__dirname, "../public", oldUser.image);
        const deleted = await File.deleteFile(oldImagePath);
        if (!deleted) {
          return res
            .status(400)
            .json({ message: "Error encountered while removing old image." });
        }
      }

      // Set user password
      if ("password" in user) {
        user.password = await Password.hashPassword(user.password);
      }

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

router.delete("/:id", authorized, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (user) {
      // Removing user image
      if (!user.image.includes("avatar-profile.jpg")) {
        const deleted = await File.deleteFile(`../public/${user.image}`);
        if (!deleted)
          return res
            .status(400)
            .json({ message: "Error encountered while removing image." });
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
