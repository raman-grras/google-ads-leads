const jwt = require("jsonwebtoken");

module.exports = function adminOnly(req, res, next) {
  const token = req.cookies.token;

  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, "super_secret_key_123");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create users" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
