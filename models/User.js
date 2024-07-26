module.exports = (db, type) => {
  return db.define("User", {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: type.STRING,
      allowNull: false,
    },
    lname: {
      type: type.STRING,
      allowNull: false,
    },
    username: {
      type: type.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: type.STRING,
      allowNull: false,
    },
    image: {
      type: type.STRING,
      allowNull: false,
    },
    gender: {
      type: type.ENUM("M", "F"),
      allowNull: false,
    },
    role: {
      type: type.ENUM("admin", "customer"),
      allowNull: false,
    },
  });
};
