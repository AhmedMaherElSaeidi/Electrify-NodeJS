const bcrypt = require("bcrypt");

class Password {
  static _salt = 10;

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(this._salt);
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = Password;
