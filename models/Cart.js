module.exports = (db, type) => {
  return db.define("Cart", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: type.STRING,
      allowNull: false,
    },
    status: {
      type: type.ENUM("pending", "delivered", "canceled"),
      allowNull: false,
    },
  });
};
