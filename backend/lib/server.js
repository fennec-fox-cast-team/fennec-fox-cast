'use strict';

const fs = require('fs');

const mongoose = require('mongoose');
<<<<<<< HEAD
// const { dbhost, dbpassword, dbuser } = require('./config/db.js');
=======
const { dbhost, dbpassword, dbuser } = require('./../config/db.js');
>>>>>>> fd34c250a885f2a717fb97f2340b430ba21fa487

const fastify = require('fastify')({
    https: {
        key: fs.readFileSync('./config/security/key.pem'),
        cert: fs.readFileSync('./config/security/cert.pem')
    },
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

fastify.get('/chat', (req, reply) => {
    const stream = fs.createReadStream('./templates/chat.html');
    reply.type('text/html').send(stream);
});


// Connect to DB
const connectToDB = () => {
    mongoose
        .connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log('Connection error to MongoDB!', err));
};
connectToDB();


module.exports = fastify;
