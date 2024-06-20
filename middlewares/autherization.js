const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    console.log(token);

    if (token) {
      const decoded = await jwt.verify(token, process.env.secretTokenKey);
      //console.log(decoded);
      req.body.user = decoded;
      next();
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    } else {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
};

const authorize = (allowedUserTypes) => {
  return (req, res, next) => {
    const userType = req.body.user.userType; // Extract userType from the decoded token
    if (allowedUserTypes.includes(userType)) {
      req.body.productSupplier = req.body.user._id;
      next(); // User type is allowed, proceed to the next middleware
    } else {
      return res.status(403).json({ msg: "Forbidden: Access is denied" });
    }
  };
};

module.exports = { auth, authorize };
