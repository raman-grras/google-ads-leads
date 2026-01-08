const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "user"),
      defaultValue: "user"
    }
  },
  {
    tableName: "users",
    timestamps: true
  }
);

module.exports = User;
