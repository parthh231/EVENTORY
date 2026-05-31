const express = require("express");
const router = express.Router();
const { registerUser, loginUser, verifyOtp} = require("../controllers/authController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verifyotp", verifyOtp);

module.exports = router;

