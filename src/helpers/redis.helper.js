const redis = require("redis");
const client = redis.createClient();

const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    return client.set(key, value, (error, res) => {
      if (error) reject(error);
      resolve(res);
    });
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    return client.get(key, (error, res) => {
      if (error) reject(error);
      resolve(res);
    });
  });
};

module.exports = {
  setJWT,
  getJWT,
};
