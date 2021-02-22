const express = require("express");
const router = express.Router();

const { hashPassword } = require("../helpers/bcrypt.helper");
const { insertUser } = require("../modal/user/User.modal");

router.post("/", async (req, res) => {
  console.log(req.data);
  const { password } = req.body;
  console.log(password);
  try {
    const hashedPassword = await hashPassword(password);
    const data = await insertUser({ ...req.body, password: hashedPassword });
    res.json({ message: "New User Created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
