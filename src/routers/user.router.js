const express = require("express");
const router = express.Router();

const { hashPassword, comparePass } = require("../helpers/bcrypt.helper");
const {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
} = require("../helpers/jwt.helper");

const {
  insertUser,
  getUserByEmail,
  getUserById,
} = require("../modal/user/User.modal");
const { authMiddle } = require("../middleware/authorization.middleware");

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
    const accessToken = await createAccessToken(user.email, `${user._id}`);
    const refreshToken = await createRefreshToken(user.email, `${user._id}`);

    res.json({ message: "Login Successful!", user, accessToken });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//Get user details
router.get("/", authMiddle, async (req, res) => {
  const _id = req.userId;
  console.log(_id);
  const userProfile = await getUserById(_id);
  res.json({ userProfile });
});

module.exports = router;
