'use strict';

// const fs = require('fs');

const mongoose = require('mongoose');
const { dbhost, dbpassword, dbuser } = require('./config/db.js');

const fastify = require('fastify')({
    // https: {
    //     key: fs.readFileSync('./config/security/key.pem'),
    //     cert: fs.readFileSync('./config/security/cert.pem')
    // },
    logger: true
});
const swagger = require('./config/swagger.js');


fastify.register(require('fastify-swagger'), swagger.options);

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
});


// Connect to DB
const connectToDB = () => {
    mongoose
        .connect(`mongodb://${dbuser}:${dbpassword}@${dbhost}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('Connection error to MongoDB!', err));
};
connectToDB();


module.exports = fastify;
