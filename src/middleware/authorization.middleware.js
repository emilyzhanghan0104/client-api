const { verifyAccessToken } = require("../helpers/jwt.helper");
const { getJWT } = require("../helpers/redis.helper");

const authMiddle = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decoded = await verifyAccessToken(authorization);
    if (!decoded.data) {
      return res.status(403).json({ message: "forbidden" });
    }
    const userId = await getJWT(authorization);

    if (!userId) {
      return res.status(403).json({ message: "forbidden" });
    }

    req.userId = userId;
    return next();
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = {
  authMiddle,
};
