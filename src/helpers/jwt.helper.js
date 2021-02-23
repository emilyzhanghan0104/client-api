const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return Promise.resolve(
    jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    )
  );
};

const createRefreshToken = (payload) => {
  return Promise.resolve(
    jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30 days" }
    )
  );
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
