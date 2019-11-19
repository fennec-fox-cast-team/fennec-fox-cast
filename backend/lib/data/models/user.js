'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    friends: [ObjectId],
    status: String,
    token: String,
    rooms: [ObjectId],
});

module.exports = mongoose.model('User', userSchema);
