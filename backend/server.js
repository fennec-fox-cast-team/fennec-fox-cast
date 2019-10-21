'use strict';

const fastify = require('fastify')({
    logger: true
});

const swagger = require('./config/swagger.js');

const { dbhost, dbpassword, dbuser } = require('./config/db.js');

fastify.register(require('fastify-swagger'), swagger.options);

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
});

const mongoose = require('mongoose');

// Connect to DB
mongoose
    .connect(`mongodb+srv://${dbuser}:${dbpassword}@${dbhost}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Connection error to MongoDB!', err));

module.exports = fastify;
