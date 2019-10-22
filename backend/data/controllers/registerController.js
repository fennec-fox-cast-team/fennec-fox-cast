'use strict';

const boom = require('@hapi/boom');

const User = require('../models/user.js');

// Add new user
exports.addUser = async req => {
    try {
        // console.log(req);
        //const username = req.body['username'];
        //const password = req.body['password'];
        const user = new User(req.body);
        if (await User.findOne({ username: user.username })) {
            return { status: '409, Conflict', data: 'User already exists!' };
        }

        return { status: '200, Ok', data: await user.save() };
    } catch (err) {
        throw boom.boomify(err);
    }
};
