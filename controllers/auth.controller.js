const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function login(req, res) {

  try {
    const { email, password } = req.body;
    console.log(email, password)

    // 1 email check
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2 password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3 JWT generate
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      "super_secret_key_123",
      { expiresIn: "1d" }
    );

    // 4 cookie set
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", 
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      role: user.role,
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function me(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, "super_secret_key_123");

    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "email", "role"],
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}


module.exports = { login, me };
