const express = require("express");
const router = express.Router();

const { hashPassword } = require("../helpers/bcrypt.helper");
const { insertUser } = require("../modal/user/User.modal");

router.all("/", (req, res, next) => {
  next();
});

router.post("/", async (req, res) => {
  const { password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const data = await insertUser({ ...req.body, password: hashedPassword });
    res.json({ message: "New User Created", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
