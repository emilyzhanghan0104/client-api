const express = require("express");
const router = express.Router();

const { hashPassword, comparePass } = require("../helpers/bcrypt.helper");
const {
  createAccessToken,
  createRefreshToken,
} = require("../helpers/jwt.helper");

const {
  insertUser,
  getUserByEmail,
  getUserById,
  updatePassword,
} = require("../modal/user/User.modal");

const {
  setResetPin,
  getPinByEmailPin,
} = require("../modal/restPin/ResetPin.modal");
const { authMiddle } = require("../middleware/authorization.middleware");
const { emailProcessor } = require("../helpers/email.helper");
const { checkExpiry } = require("../utils/checkExpiry");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// User sign up router
router.post("/", async (req, res) => {
  const { password } = req.body;

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

    res.json({ message: "Login Successful!", user, accessToken, refreshToken });
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

//Reset password
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (!user || !user._id) {
    return res.json({ status: "error", message: "email is invalid" });
  }
  try {
    const resetPin = await setResetPin(email);

    const result = await emailProcessor(email, resetPin.pin);
    if (result && result.messageId) {
      return res.json({
        status: "success",
        message: "reset pin email has been sent",
      });
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

router.patch("/reset-password", async (req, res) => {
  const { email, pin, password } = req.body;

  if (!email || !pin || !password) {
    return res.json({ status: "error", message: "info is incomplete" });
  }
  try {
    const getPin = await getPinByEmailPin(email, pin);

    if (getPin._id) {
      const addDate = getPin.addedAt;

      const expired = checkExpiry(
        addDate,
        parseInt(process.env.RESET_PIN_EXP_DAY)
      );
      if (expired) {
        return res.json({ status: "error", message: "pin has expired" });
      }

      const result = await updatePassword(email, password);
      return res.json({ status: "success", result });
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});
module.exports = router;
