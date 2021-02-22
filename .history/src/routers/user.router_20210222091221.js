const express = require("express");
const router = express.Router();

const { hashPassword } = require("../helpers/bcrypt.helper");

router.all("/", (req, res, next) => {
  next();
});

router.post("/", (req, res) => {
  const { password } = req.body;
  const hashedPassword = hashPassword(password);
});

module.exports = router;
