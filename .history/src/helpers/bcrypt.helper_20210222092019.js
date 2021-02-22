const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (plaintextPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hash(plaintextPassword, saltRounds));
  });
};

module.exports = {
  hashPassword,
};
