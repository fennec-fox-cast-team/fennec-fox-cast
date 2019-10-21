'use strict';

const boom = require('@hapi/boom');

const User = require('../models/user.js');

const fastify = require('../../server.js');

exports.login = async req => {
    try {
        const data = JSON.parse(req.body);
        const user = await User.findOne({ 'username': data.username, 'password': data.password });
        if (user) {
            const token = fastify.jwt.sign(data);
            return { status: '200, Ok', data: token };
        }
        return { status: '404', data: 'Item not found!' };
    } catch (err) {
        throw boom.boomify(err);
    }
};
