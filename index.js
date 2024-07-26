const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
if (app.get("env") === "development") app.use(morgan("tiny"));

// Importing routes (APIs)
const carts_routes = require("./routes/carts");
const default_routes = require("./routes/default");
const products_routes = require("./routes/products");
const cartItems_routes = require("./routes/cartItems");
const categories_routes = require("./routes/categories");

app.use("/", default_routes);
app.use("/api/carts", carts_routes);
app.use("/api/products", products_routes);
app.use("/api/cartItems", cartItems_routes);
app.use("/api/categories", categories_routes);

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`Server is listening...`);
  console.log("====================================");
});
