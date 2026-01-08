const bcrypt = require("bcryptjs");
const User = require("../models/user");



async function createUser(req, res) {
    try {
        const { firstName, lastName, email, mobileNo, password, role } = req.body;

        if (!firstName || !lastName || !email || !mobileNo || !password ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            mobileNo,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNo: user.mobileNo,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


async function getUserList(res, res) {
   try {
    const users = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "mobileNo",
        "role",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createUser , getUserList }
