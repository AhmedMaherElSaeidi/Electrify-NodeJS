module.exports = (db, type) => {
  return db.define("Product", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: type.STRING,
      allowNull: false,
    },
    image: {
      type: type.STRING,
      allowNull: true,
    },
    price: {
      type: type.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: type.INTEGER,
      allowNull: false,
    },
    description: {
      type: type.TEXT,
      allowNull: true,
    },
  });
};
