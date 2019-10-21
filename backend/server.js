'use strict';

const fastify = require('fastify')({
    logger: true
});

const swagger = require('./config/swagger.js');

const { dbhost, dbname, dbpassword, dbuser } = require('./config/db.js');

fastify.register(require('fastify-swagger'), swagger.options);

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
});

const mongoose = require('mongoose');

// Connect to DB
mongoose
    .connect(`mongodb://${dbuser}:${dbpassword}@${dbhost}/${dbname}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Connection error to MongoDB!', err));

module.exports = fastify;
