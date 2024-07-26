const Sequelize = require("sequelize");
const config = require("./config/database.config.json");

// DB Connection Variables
const env = process.env.NODE_ENV || "development";
const { host, port, dialect, username, password, database } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
});

// connect to mysql db
sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// export sequelize connection
module.exports = sequelize;
