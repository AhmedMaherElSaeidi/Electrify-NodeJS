const jwt = require("jsonwebtoken");

class JWT {
  #key = "5BD24DCB1483578373DD86A7AD35F";
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
