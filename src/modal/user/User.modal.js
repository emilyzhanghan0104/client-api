const { Promise } = require("mongoose");
const { UserSchema } = require("../user/User.schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    UserSchema.findOne({ email }, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

const storeRefreshToken = (_id, token) => {
  return new Promise((resolve, reject) => {
    UserSchema.findOneAndUpdate(
      { _id },
      {
        $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
      },
      { new: true }
    )
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

module.exports = {
  insertUser,
  getUserByEmail,
  storeRefreshToken,
};
