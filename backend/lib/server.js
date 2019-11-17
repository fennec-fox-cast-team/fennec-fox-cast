'use strict';

const fs = require('fs');

const mongoose = require('mongoose');
const { dbhost, dbpassword, dbuser } = require('./config/db.js');

const fastify = require('fastify')({
    logger: true
});
const fws = require('fastify-websocket');
const swagger = require('./config/swagger.js');

const clients = [];



fastify.register(require('fastify-swagger'), swagger.options);

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
});

fastify.register(fws);

fastify.get('/', (req, reply) => {
    const stream = fs.createReadStream('./templates/index.html');
    reply.type('text/html').send(stream);
});

fastify.get('/streamer', (req, reply) => {
    const stream = fs.createReadStream('./templates/streamer.html');
    reply.type('text/html').send(stream);
});

fastify.get('/client', (req, reply) => {
    const stream = fs.createReadStream('./templates/client.html');
    reply.type('text/html').send(stream);
});

fastify.get('/video-audio', (req, reply) => {
    const stream = fs.createReadStream('./templates/video-audio.html');
    reply.type('text/html').send(stream);
});

fastify.get('/chat', { websocket: true }, connection => {
    if (clients.indexOf(connection) === -1) {
        clients.push(connection);
        console.log('Connection has been saved!');
    } else {
        console.log('Connection has already saved!');
    }

    connection.socket.on('message', message => {

        // console.log('msg >>>', message);

        clients.forEach(client => {
            if (connection !== client) {
                client.socket.send(message);
            }
        });
    });

    connection.socket.on('close', (reasonCode, description) => {

        console.log('Disconnected!');
        console.dir({ reasonCode, description });

        const index = clients.indexOf(connection);
        if (index > -1) clients.splice(index, 1);
    });
});


// Connect to DB
mongoose
    .connect(`mongodb://${dbuser}:${dbpassword}@${dbhost}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Connection error to MongoDB!', err));


module.exports = fastify;
