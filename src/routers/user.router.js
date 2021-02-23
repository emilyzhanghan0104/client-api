const express = require("express");
const router = express.Router();

const { hashPassword, comparePass } = require("../helpers/bcrypt.helper");
const {
  createAccessToken,
  createRefreshToken,
} = require("../helpers/jwt.helper");
const { insertUser, getUserByEmail } = require("../modal/user/User.modal");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// User sign up router
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

//User sign in router
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ status: "error", message: "invalid form submission" });

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.json({ status: "error", message: "can't find the user" });
    }
    const result = await comparePass(password, user.password);
    if (!result) {
      return res.json({
        status: "error",
        message: "email or password incorrect",
      });
    }
    const accessToken = await createAccessToken(user.email);
    const refreshToken = await createRefreshToken(user.email);

    res.json({ message: "Login Successful!", user, accessToken, refreshToken });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
