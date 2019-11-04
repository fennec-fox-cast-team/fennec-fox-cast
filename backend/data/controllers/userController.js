'use strict';

const boom = require('@hapi/boom');

const User = require('../models/user.js');

const crypt = require('../../helpers/crypt.js');

// Get all users
exports.getAllUsers = async () => {
    try {
        return { status: '200, Ok', data: await User.find() };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get single user by username and password
exports.getUserByUsername = async req => {
    try {
        const data = req.body;
        console.log('\n\n');
        console.dir(data);
        console.log('\n\n');
        const user = await User.findOne({ 'username': data.username });
        if (user && await crypt.compare(data.password, user.password)) {
            return { status: '200, Ok', data: user };
        } else {
            return { status: '404', data: 'Item not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Update an existing user
exports.updateUserByUsername = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username });
        if (user && await crypt.compare(data.password, user.password)) {
            return { status: '200, Ok', data: await User.findOneAndUpdate(user.id, data.update, { new: true }) };
        } else {
            return { status: '404', data: 'Item not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};


// Delete user by username and password
exports.deleteUserByUsername = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username });
        if (user && await crypt.compare(data.password, user.password)) {
            return { status: '200, Ok', data: await User.findOneAndRemove(user.id) };
        } else {
            return { status: '404', data: 'Item not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};
