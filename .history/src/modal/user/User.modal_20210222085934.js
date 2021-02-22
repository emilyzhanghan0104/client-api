const { Promise } = require('mongoose');
const UserSchema = require('../user/User.schema');
const { UserSchema } = require('../user/User.schema');

const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj).save().then(data=>resolve(data)).catch(error=>reject(error))
    })
}