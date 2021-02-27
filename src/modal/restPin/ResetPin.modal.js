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

const getPinByEmailPin = (email, pin) => {
  return new Promise((resolve, reject) => {
    ResetPinSchema.findOne({ email, pin }, (error, data) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(data);
    });
  });
};

const deletePin = (email, pin) => {
  ResetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
    if (error) {
      throw new Error(error.message);
    }
  });
};

module.exports = {
  setResetPin,
  getPinByEmailPin,
  deletePin,
};
