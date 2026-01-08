const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function seedAdmin() {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({where: { role: "admin" }});

    if (adminExists) {
      console.log(" Admin already exists");
      return;
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD || "Admin@123",10);

    //  Create admin
    await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: process.env.ADMIN_DEFAULT_EMAIL || "admin@gmail.com",
      mobileNo: "9999999999",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin seeded successfully");

  } catch (error) {
    console.error("Admin seeder failed:", error.message);
  }
}

module.exports = seedAdmin;
