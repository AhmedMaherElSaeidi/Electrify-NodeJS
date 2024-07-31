require("dotenv").config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_KEY: process.env.JWT_KEY,
};
