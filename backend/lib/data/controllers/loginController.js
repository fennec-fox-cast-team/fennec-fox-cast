'use strict';

const boom = require('@hapi/boom');

const User = require('../models/user.js');

const fastify = require('../../server.js');

const crypt = require('../../helpers/crypt.js');


exports.login = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username });

        if (user && await crypt.compare(data.password, user.password)) {
            const token = fastify.jwt.sign(data);
            await User.findByIdAndUpdate(user.id, { token, status: 'online' }, { new: true });

            const friendsUsernames = [];
            for (const friendId of user.friends) {
                const friend = await User.findById(friendId);
                friendsUsernames.push(friend.username);
            }
            return { status: '200, Ok', data: { token, 'username': user.username, friendsUsernames } };
        }
        return { status: '404', data: 'User not found!' };
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.logout = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username, token: data.token });

        if (user && data.token !== '') {
            await User.findByIdAndUpdate(user.id, { token: '', status: 'offline' }, { new: true });
            return { status: '200, Ok' };
        }
        return { status: '404', data: 'User not found!' };
    } catch (err) {
        throw boom.boomify(err);
    }
};
