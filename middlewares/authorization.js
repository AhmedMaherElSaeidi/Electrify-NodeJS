const JWT = require("../services/JWT");

const authorized = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "Access Denied, No token provided." });

    const jwt = new JWT();
    req.user = jwt.verifyAuthToken(token);
    next();
  } catch (error) {
    res.status(400).json({ message: "INVALID TOKEN." });
  }
};

const authorizedAdmin = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "Access Denied, No token provided." });

    const jwt = new JWT();
    const user = jwt.verifyAuthToken(token);
    if (!user.admin)
      return res.status(403).json({ message: "Unauthorized access." });

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "INVALID TOKEN." });
  }
};

module.exports = { authorized, authorizedAdmin };
