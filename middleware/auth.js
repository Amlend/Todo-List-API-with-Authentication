const jwt = require("jsonwebtoken");
const TodoUser = require("../models/todoUser");

exports.authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
