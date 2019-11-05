'use strict';

const boom = require('@hapi/boom');
const crypt = require('../../helpers/crypt.js');

const User = require('../models/user.js');
const Room = require('../models/room.js');

const { DeleteRoom } = require('../controllers/roomController.js');

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
        const user = await User.findOne({ 'username': data.username });

        if (user && await crypt.compare(data.password, user.password)) {
            return { status: '200, Ok', data: user };
        } else {
            return { status: '404', data: 'User not found!' };
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
            return { status: '200, Ok', data: await User.findByIdAndUpdate(user._id, data.update, { new: true }) };
        } else {
            return { status: '404', data: 'User not found!' };
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
            for (const roomID of user.rooms) {
                const room = await Room.findById(roomID);

                if (!room) continue;

                if (user._id.equals(room.owner)) {
                    await DeleteRoom({
                        body: {
                            'username': user.username,
                            'password': data.password,
                            'room_id': roomID
                        }
                    });
                } else {
                    const index = room.members.indexOf(user._id);
                    if (index > -1) room.members.splice(index, 1);

                    await room.save();
                }
            }

            return { status: '200, Ok', data: await User.findByIdAndRemove(user._id) };
        } else {
            return { status: '404', data: 'User not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};
