const Sequelize = require("sequelize");
const config = require("./config/config");

// DB Connection Variables
const { HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALECT, DB_PORT } = config;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  HOST,
  DB_PORT,
  dialect: DB_DIALECT,
});

// connect to mysql db
sequelize
  .authenticate()
  .then(() => {
    console.log("======> DB Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("======> Unable to connect to the database: ", error);
  });

// export sequelize connection
module.exports = sequelize;
