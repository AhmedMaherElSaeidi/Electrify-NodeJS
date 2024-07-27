const { authorized, authorizedAdmin } = require("../middlewares/authorization");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { ProductCategory } = require("../models/index");

// Table schema (for validating post, and put request)
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});
const query = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

// CRUD operations
router.get("/", async (req, res) => {
  const categories = await ProductCategory.findAll(query);
  res.status(201).json({ data: categories });
});

router.get("/:id", async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      where: { id: req.params.id },
      ...query,
    });

    category
      ? res.status(201).json({ data: category })
      : res
          .status(404)
          .json({ message: "Category with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", authorized, authorizedAdmin, async (req, res) => {
  try {
    let category = req.body;

    // Validate data
    const { error } = schema.validate(category);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Saving category
    category = await ProductCategory.create(category);
    res.status(201).json({ data: category });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", authorized, authorizedAdmin, async (req, res) => {
  try {
    let category = await ProductCategory.findOne({
      where: { id: req.params.id },
    });

    if (category) {
      let category = req.body;

      // Validate data
      const { error } = schema.validate(category);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      // Updating ProductCategory
      await ProductCategory.update(category, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).json({ message: "Updated successfully." });
    }

    res.status(404).json({ message: "Category with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete("/:id", authorized, authorizedAdmin, async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      where: { id: req.params.id },
    });

    if (category) {
      // Removing category
      await ProductCategory.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ message: "Deleted successfully." });
    }

    res.status(404).json({ message: "Category with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
