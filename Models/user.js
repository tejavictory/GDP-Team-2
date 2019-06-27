/*
     The password will be hashed and stored.
*/
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

  _id: {
    type: Number,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role_id: {
    type: Number,
    required: true
  }

})
module.exports = mongoose.model('User', UserSchema)