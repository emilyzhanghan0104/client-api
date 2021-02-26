const { ResetPinSchema } = require("../restPin/ResetPin.schema");
const { randomGenerator } = require("../../utils/randomGenerator");

const setResetPin = (email) => {
  const pinLength = 6;
  const resetPin = randomGenerator(pinLength);
  const resetPinObj = {
    email,
    pin: resetPin,
  };
  return new Promise((resolve, reject) => {
    ResetPinSchema(resetPinObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

module.exports = {
  setResetPin,
};
