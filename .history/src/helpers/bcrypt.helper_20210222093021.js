const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (plaintextPassword) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(plaintextPassword, 10));
  });
};

module.exports = {
  hashPassword,
};
