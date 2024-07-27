const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/index");
const Password = require("../services/Password");
const JWT = require("../services/JWT");

// Table schema (for validating post, and put request)
const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Authentication
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate data
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Fetching user data
    const user = await User.findOne({
      where: { username },
    });
    if (!user)
      return res.status(404).json({ message: "Username doesn't exist" });

    // Validating password
    const validPassword = await Password.comparePassword(
      password,
      user.password
    );
    if (!validPassword)
      return res.status(404).json({ message: "Invalid password." });

    const token = JWT.sign({
      id: user.id,
      name: `${user.fname} ${user.lname}`,
      username: user.username,
      telephone: user.telephone,
      image: user.image,
      gender: user.gender,
      admin: user.role === "admin" ? true : false,
    });
    res.status(201).json({ data: token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
