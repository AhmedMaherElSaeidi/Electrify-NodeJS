const jwt = require("jsonwebtoken");
const config = require("../config/config");

class JWT {
  #key = config.JWT_KEY;
  #ms = "3600s";

  getAuthToken(user) {
    const payload = {
      id: user.id,
      name: `${user.fname} ${user.lname}`,
      username: user.username,
      telephone: user.telephone,
      image: user.image,
      gender: user.gender,
      admin: user.role === "admin" ? true : false,
    };

    return jwt.sign(payload, this.#key, { expiresIn: this.#ms });
  }

  verifyAuthToken(token) {
    return jwt.verify(token, this.#key);
  }
}

module.exports = JWT;
