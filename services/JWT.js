const jwt = require("jsonwebtoken");

class JWT {
  static _key = "5BD24DCB1483578373DD86A7AD35F";
  static _ms = "3600s";

  static sign(object) {
    return jwt.sign(object, this._key, { expiresIn: this._ms });
  }

  static verify(token) {}
}

module.exports = JWT;
