const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).send("Hello there, Server is running!");
});

module.exports = router;
