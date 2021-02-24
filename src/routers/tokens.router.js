const express = require("express");
const router = express.Router();
const {
  verifyRefreshToken,
  createAccessToken,
} = require("../helpers/jwt.helper");
const { getUserByEmail } = require("../modal/user/User.modal");

router.all("/", async (req, res) => {
  const { authorization } = req.headers;
  const decoded = await verifyRefreshToken(authorization);
  if (!decoded.data) {
    return res.status(403).json({ message: "forbidden" });
  }

  const userProfile = await getUserByEmail(decoded.data);
  if (!userProfile._id) {
    return res.status(403).json({ message: "forbidden" });
  }
  let tokenExp = userProfile.refreshJWT.addedAt;
  const dbRefreshToken = userProfile.refreshJWT.token;

  tokenExp = tokenExp.setDate(
    tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
  );

  const today = new Date();

  if (authorization !== dbRefreshToken || tokenExp < today) {
    return res.status(403).json({ message: "forbidden" });
  }
  const accessJWT = await createAccessToken(
    decoded.data,
    userProfile._id.toString()
  );
  return res.json({ status: "success", accessJWT });
});

module.exports = router;
