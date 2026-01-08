const express = require("express");
const router = express.Router();
const adminOnly = require("../middlewares/adminOnly");
const { createUser , getUserList } = require("../controllers/user.controller");


router.post("/create", adminOnly, createUser);
router.get("/list",  getUserList )




module.exports = router;
