const { verifyAccessToken } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");

const authMiddle = async (req, res, next) => {
  let authorization;
  try {
    authorization = req.headers.authorization;

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
    if (error.message === "jwt expired") {
      await deleteJWT(authorization);
    }
    return res.json({ message: error.message });
  }
};

module.exports = {
  authMiddle,
};
