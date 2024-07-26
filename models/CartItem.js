module.exports = (db, type) => {
  return db.define("CartItem", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: type.INTEGER,
      allowNull: false,
    },
  });
};
