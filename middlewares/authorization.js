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
  const isAdmin = req.user.admin;
  if (!isAdmin)
    return res.status(403).json({ message: "Unauthorized access." });

  next();
};

module.exports = { authorized, authorizedAdmin };
