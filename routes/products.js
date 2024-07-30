const express = require("express");
const router = express.Router();
const Joi = require("joi");
const path = require("path");
const File = require("../services/File");
const { Product, ProductCategory } = require("../models/index");
const { authorized, authorizedAdmin } = require("../middlewares/authorization");

// Table schema (for validating post, and put request)
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().positive().precision(2).required(),
  stock: Joi.number().min(0).required(),
  description: Joi.string().min(5).required(),
  category_id: Joi.number().positive().required(),
  image: Joi.string(),
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

const upload = File.uploadFile();

// CRUD operations
router.get("/", async (req, res) => {
  const products = await Product.findAll(query);
  res.status(201).json({ data: products });
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      ...query,
    });

    product
      ? res.status(201).json({ data: product })
      : res.status(404).json({ message: "Product with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post(
  "/",
  authorized,
  authorizedAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      let product = req.body;

      // Validate data
      const { error } = schema.validate(product);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      // Set product image
      product.image = req.file
        ? req.file.filename
        : "default-product-image.jpg";

      // Saving product
      product = await Product.create(product);
      res.status(201).json({ data: product });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);

router.put("/:id", authorized, upload.single("image"), async (req, res) => {
  try {
    let oldProduct = await Product.findOne({
      where: { id: req.params.id },
    });

    if (oldProduct) {
      let product = req.body;

      // Validate data
      const { error } = schema.validate(product);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      // Set product image
      product.image = req.file ? req.file.filename : oldProduct.image;
      if (
        req.file &&
        oldProduct.image !== "default-product-image.jpg"
      ) {
        const imagePath = path.join(__dirname, "../public", oldProduct.image);
        const deleted = await File.deleteFile(imagePath);
        if (!deleted) {
          console.log('====================================');
          console.log("IM HERE");
          console.log('====================================');
          return res
            .status(400)
            .json({ message: "Error encountered while removing image." });
        }
      }

      // Updating product
      await Product.update(product, {
        where: {
          id: req.params.id,
        },
      });
      return res.status(201).json({ message: "Updated successfully." });
    }

    res.status(404).json({ message: "Product with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete("/:id", authorized, authorizedAdmin, async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });

    if (product) {
      // Removing product image
      if (product.image !== "default-product-image.jpg") {
        const imagePath = path.join(__dirname, "../public", product.image);
        const deleted = await File.deleteFile(imagePath);
        if (!deleted) {
          return res
            .status(400)
            .json({ message: "Error encountered while removing image." });
        }
      }

      // Removing product
      await Product.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ message: "Deleted successfully." });
    }

    res.status(404).json({ message: "Product with given ID wasn't found" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
