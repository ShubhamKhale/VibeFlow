// backend/models/UserInfo.js
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    required: true,
    unique: true,
  }
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema, 'user_info'); // Third parameter explicitly sets the collection name

module.exports = UserInfo;
