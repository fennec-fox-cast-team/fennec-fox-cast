'use strict';

const boom = require('@hapi/boom');

const User = require('../models/user.js');

// Get all users
exports.getAllUsers = async () => {
    try {
        return { status: '200, Ok', data: await User.find() };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get single user by ID
exports.getUserById = async req => {
    try {
        const id = req.params.id;
        return { status: '200, Ok', data: await User.findById(id) };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Add new user
exports.addUser = async req => {
    try {
        // console.log(req);
        const user = new User(JSON.parse(req.body));

        if (await User.findOne({ username: user.username })) {
            return { status: '409, Conflict', data: 'User already exists!' };
        }

        return { status: '200, Ok', data: await user.save() };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Update an existing user
exports.updateUserById = async req => {
    try {
        const id = req.params.id;
        const user = JSON.parse(req.body);
        const { ...updateData } = user;
        return { status: '200, Ok', data: await User.findByIdAndUpdate(id, updateData, { new: true }) };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Delete user by Id
exports.deleteUserById = async req => {
    try {
        const id = req.params.id;
        return { status: '200, Ok', data: await User.findByIdAndRemove(id) };
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Delete user by username
exports.deleteUserByUsername = async req => {
    try {
        const username = JSON.parse(req.body).username;
        return { status: '200, Ok', data: await User.findOneAndRemove({ username }) };
    } catch (err) {
        throw boom.boomify(err);
    }
};
