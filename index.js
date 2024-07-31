const { authorized } = require("./middlewares/authorization");
const bodyParser = require("body-parser");
const config = require("./config/config");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();

// Global Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
if (app.get("env") === "development") app.use(morgan("tiny"));

// Importing routes (APIs)
const auth_routes = require("./routes/auth");
const user_routes = require("./routes/users");
const carts_routes = require("./routes/carts");
const default_routes = require("./routes/default");
const products_routes = require("./routes/products");
const cartItems_routes = require("./routes/cartItems");
const categories_routes = require("./routes/categories");

app.use("/", default_routes);
app.use("/api/auth", auth_routes);
app.use("/api/users", user_routes);
app.use("/api/carts", authorized, carts_routes);
app.use("/api/products", products_routes);
app.use("/api/cartItems", authorized, cartItems_routes);
app.use("/api/categories", categories_routes);

// Server listening
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`Server is listening... PORT:${PORT}`);
  console.log("====================================");
});
