const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Product, ProductCategory } = require("../models/index");

// Table schema (for validating post, and put request)
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().positive().required(),
  description: Joi.string().min(5).required(),
  category_id: Joi.number().positive().required(),
});
const query = {
  include: [
    {
      model: ProductCategory,
      as: "product_category",
      attributes: ["name"],
    },
  ],
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

// CRUD operations
router.get("/", async (req, res) => {
  const products = await Product.findAll(query);
  res.status(201).json({ data: products });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({
    where: { id: req.params.id },
    ...query,
  });
  product
    ? res.status(201).json({ data: product })
    : res.status(404).json({ message: "Product with given ID wasn't found" });
});

router.post("/", async (req, res) => {
  let product = req.body;

  // Validate data
  const { error } = schema.validate(product);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Set product image
  product.image = product.image ? product.image : "default-product-image.jpg";

  // Saving product
  product = await Product.create({ data: product });
  res.status(201).json({ data: product });
});

router.put("/:id", async (req, res) => {
  let product = await Product.findOne({
    where: { id: req.params.id },
  });

  if (product) {
    let product = req.body;

    // Validate data
    const { error } = schema.validate(product);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Set product image
    product.image = product.image ? product.image : "default-product-image.jpg";

    // Updating product
    await Product.update(product, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(201).json({ message: "Updated successfully." });
  }

  res.status(404).json({ message: "Product with given ID wasn't found" });
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findOne({
    where: { id: req.params.id },
  });

  if (product) {
    // Removing product image
    if (product.image !== "default-product-image.jpg") {
      // do sth..
    }

    // Removing product
    await Product.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Deleted successfully." });
  }

  res.status(404).json({ message: "Product with given ID wasn't found" });
});

module.exports = router;
