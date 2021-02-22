const express = require("express");
const router = express.Router();

const { hashPassword } = require("../helpers/bcrypt.helper");
const { insertUser } = require("../modal/user/User.modal");

router.all("/", (req, res, next) => {
  next();
});

router.post("/", async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashPassword(password);
});

module.exports = router;
