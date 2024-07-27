const db = require("../database");
const Sequelize = require("sequelize");
const UserModel = require("./User");
const CartModel = require("./Cart");
const ProductModel = require("./Product");
const CatItemModel = require("./CartItem");
const ProductCategoryModel = require("./ProductCategory");

// Convert models to tables (calling models functions)
const User = UserModel(db, Sequelize);
const Cart = CartModel(db, Sequelize);
const CatItem = CatItemModel(db, Sequelize);
const Product = ProductModel(db, Sequelize);
const ProductCategory = ProductCategoryModel(db, Sequelize);

// Associations
const cascade = {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
};

User.hasMany(Cart, { ...cascade, foreignKey: "user_id", as: "user_cart" });
Cart.belongsTo(User, { foreignKey: "user_id", as: "user_cart" });

Cart.hasMany(CatItem, { ...cascade, foreignKey: "cart_id", as: "cart_items" });
CatItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart_items" });

Product.hasMany(CatItem, {
  ...cascade,
  foreignKey: "product_id",
  as: "product_items",
});
CatItem.belongsTo(Product, { foreignKey: "product_id", as: "product_items" });

ProductCategory.hasMany(Product, {
  ...cascade,
  foreignKey: "category_id",
  as: "product_category",
});
Product.belongsTo(ProductCategory, {
  foreignKey: "category_id",
  as: "product_category",
});

// convert models to tables
// force:false => if tables are not created, create these tables
// make force:true => when you need to drop this schema and build it again
db.sync({ force: false }).then(async () => {
  const productCategoryCount = await ProductCategory.count();
  if (productCategoryCount === 0) {
    await ProductCategory.bulkCreate([
      { name: "Lighting" },
      { name: "Power Management" },
      { name: "Smart Home Devices" },
      { name: "Kitchen Appliances" },
      { name: "Cooling and Heating" },
    ]);
  }
});

// export tables
module.exports = {
  User,
  Cart,
  CatItem,
  Product,
  ProductCategory,
};
