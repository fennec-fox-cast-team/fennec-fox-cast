'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomSchema = new mongoose.Schema({
    name: String,
    owner: ObjectId,
    members: [ObjectId],
    messages: [],
    connections: []
});

module.exports = mongoose.model('Room', roomSchema);
