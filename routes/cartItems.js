const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { CatItem, Product } = require("../models/index");

// Table schema (for validating post, and put request)
const schema = Joi.object({
  quantity: Joi.number().positive().required(),
  cart_id: Joi.number().positive().required(),
  product_id: Joi.number().positive().required(),
});
const query = {
  include: [
    {
      model: Product,
      as: "product_items",
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  ],
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

// CRUD operations
router.get("/", async (req, res) => {
  const cartItems = await CatItem.findAll(query);
  res.status(201).json({ data: cartItems });
});

router.get("/:id", async (req, res) => {
  const cartItem = await CatItem.findOne({
    where: { id: req.params.id },
    ...query,
  });

  cartItem
    ? res.status(201).json({ data: cartItem })
    : res.status(404).json({ message: "cartItem with given ID wasn't found" });
});

router.post("/", async (req, res) => {
  let cartItem = req.body;

  // Validate data
  const { error } = schema.validate(cartItem);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Saving product
  cartItem = await CatItem.create(cartItem);
  res.status(201).json({ data: cartItem });
});

router.put("/:id", async (req, res) => {
  let cartItem = await CatItem.findOne({
    where: { id: req.params.id },
  });

  if (cartItem) {
    let cartItem = req.body;

    // Validate data
    const { error } = schema.validate(cartItem);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Updating CatItem
    await CatItem.update(cartItem, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(201).json({ message: "Updated successfully." });
  }

  res.status(404).json({ message: "CatItem with given ID wasn't found" });
});

router.delete("/:id", async (req, res) => {
  const cartItem = await CatItem.findOne({
    where: { id: req.params.id },
  });

  if (cartItem) {
    // Removing cartItem
    await CatItem.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ message: "Deleted successfully." });
  }

  res.status(404).json({ message: "CatItem with given ID wasn't found" });
});

module.exports = router;