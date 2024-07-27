const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Cart, CatItem, Product } = require("../models/index");

// Table schema (for validating post, and put request)
const schema = Joi.object({
  location: Joi.string().required(),
  user_id: Joi.number().positive().required(),
  status: Joi.string().valid("pending", "delivered", "canceled").required(),
});
const query = {
  include: [
    {
      model: CatItem,
      as: "cart_items",
      attributes: {
        exclude: ["cart_id", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Product,
          as: "product_items",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    },
  ],
  attributes: {
    exclude: ["updatedAt"],
  },
};

// CRUD operations
router.get("/", async (req, res) => {
  const carts = await Cart.findAll(query);
  res.status(201).json({ data: carts });
});

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
      ...query,
    });

    cart
      ? res.status(201).json({ data: cart })
      : res.status(404).json({ message: "Cart with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    let cart = req.body;

    // Validate data
    const { error } = schema.validate(cart);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Saving cart
    cart = await Cart.create(cart);
    res.status(201).json({ data: cart });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { id: req.params.id },
    });

    if (cart) {
      let cart = req.body;

      // Validate data
      const { error } = schema.validate(cart);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      // Updating cart
      await Cart.update(cart, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).json({ message: "Updated successfully." });
    }

    res.status(404).json({ message: "Cart with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
    });

    if (cart) {
      // Removing cart
      await Cart.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ message: "Deleted successfully." });
    }

    res.status(404).json({ message: "Cart with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
