const { Promise } = require("mongoose");
const { UserSchema } = require("../user/User.schema");
const { hashPassword } = require("../../helpers/bcrypt.helper");

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

const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    UserSchema.findOne({ _id }, (error, data) => {
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

const updatePassword = async (email, password) => {
  const hashedPass = await hashPassword(password);
  return new Promise((resolve, reject) => {
    UserSchema.findOneAndUpdate(
      { email },
      {
        $set: { password: hashedPass },
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
  getUserById,
  storeRefreshToken,
  updatePassword,
};
