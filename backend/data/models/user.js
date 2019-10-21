'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    friends: [ObjectId],
    state: String,
    salt: String
});

module.exports = mongoose.model('User', userSchema);
