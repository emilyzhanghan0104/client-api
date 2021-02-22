const express = require("express");
const router = express.Router();

const { hashPassword } = require("../helpers/bcrypt.helper");
const { insertUser } = require("../modal/user/User.modal");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next(req.body);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const { password } = req.body;
  console.log(password);
  try {
    const hashedPassword = await hashPassword(password);
    const data = await insertUser({ ...req.body, password: hashedPassword });
    res.json({ message: "New User Created", data });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
