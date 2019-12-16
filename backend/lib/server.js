'use strict';

const fs = require('fs');

const mongoose = require('mongoose');

const fastify = require('fastify')({
    logger: true
});

const swagger = require('./config/swagger.js');

const io = require('socket.io')(fastify.server);
const connectionHandle = require('./api/sockets/socket.js');

io.on('connection', connectionHandle.bind(null, io));

fastify.register(require('fastify-swagger'), swagger.options);

fastify.register(require('fastify-jwt'), {
    secret: process.env.SECRET_KEY || 'supersecret'
});


fastify.get('/chat/:uid', (req, reply) => {
    // eslint-disable-next-line no-undef
    const stream = fs.createReadStream('./templates/chat.html');
    reply.type('text/html').send(stream);
});


// Connect to DB
const connectToDB = () => {
    mongoose
        .connect(`mongodb://${process.env.DBUSER_ENV}:${process.env.DBPASSWORD_ENV}@${process.env.DBHOST_ENV}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('Connection error to MongoDB!', err));
};
connectToDB();


module.exports = fastify;
