const jwt = require("jsonwebtoken");
const { PromiseProvider } = require("mongoose");
const { getJWT, setJWT } = require("../helpers/redis.helper");
const { storeRefreshToken } = require("../modal/user/User.modal");

const createAccessToken = async (payload, id) => {
  try {
    const accessToken = await jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    await setJWT(accessToken, id);
    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createRefreshToken = async (payload, id) => {
  try {
    const refreshToken = await jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30 days" }
    );
    await storeRefreshToken(id, refreshToken);
    return Promise.resolve(refreshToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAccessToken = (authorization) => {
  try {
    const decoded = jwt.verify(authorization, process.env.JWT_ACCESS_SECRET);
    return Promise.resolve(decoded);
  } catch (error) {
    return Promise.reject(error);
  }
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
};
