'use strict';

const fs = require('fs');
const os = require('os');

const mongoose = require('mongoose');
const { dbhost, dbpassword, dbuser } = require('./../config/db.js');

const fastify = require('fastify')({
    https: {
        key: fs.readFileSync('./config/security/key.pem'),
        cert: fs.readFileSync('./config/security/cert.pem')
    },
    logger: true
});

const swagger = require('./config/swagger.js');

fastify.register(require('fastify-swagger'), swagger.options);

fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
});

const io = require('socket.io')(fastify.server);

fastify.get('/chat', (req, reply) => {
    const stream = fs.createReadStream('./templates/chat.html');
    reply.type('text/html').send(stream);

    io.on('connection', socket => {

        // convenience function to log server messages on the client
        function log() {
            const array = ['Message from server:'];
            // eslint-disable-next-line prefer-spread,prefer-rest-params
            array.push.apply(array, arguments);
            socket.emit('log', array);
        }

        socket.on('message', message => {
            log('Client said: ', message);
            // for a real app, would be room-only (not broadcast)
            socket.broadcast.emit('message', message);
        });

        socket.on('create or join', room => {
            log('Received request to create or join room ' + room);

            const clientsInRoom = io.sockets.adapter.rooms[room];
            const numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
            log('Room ' + room + ' now has ' + numClients + ' client(s)');

            if (numClients === 0) {
                socket.join(room);
                log('Client ID ' + socket.id + ' created room ' + room);
                socket.emit('created', room, socket.id);

            } else if (numClients === 1) {
                log('Client ID ' + socket.id + ' joined room ' + room);
                io.sockets.in(room).emit('join', room);
                socket.join(room);
                socket.emit('joined', room, socket.id);
                io.sockets.in(room).emit('ready');
            } else { // max two clients
                socket.emit('full', room);
            }
        });

        socket.on('ipaddr', () => {
            const ifaces = os.networkInterfaces();
            for (const dev in ifaces) {
                ifaces[dev].forEach(details => {
                    if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                        socket.emit('ipaddr', details.address);
                    }
                });
            }
        });

        socket.on('bye', () => {
            console.log('received bye');
        });

    });
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
