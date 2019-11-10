'use strict';

require('dotenv').config();

// Import Server
const fastify = require('./server.js');

// Import routes
const routes = require('./api/routes/routes.js');

routes.forEach(route => {
    fastify.route(route);
});

fastify.register(require('fastify-websocket'));

fastify.get('/ws/', { websocket: true }, (connection, req) => {
    connection.socket.on('message', message => {
        // message === 'hi from client'
        console.log('msg >>>', message);
        console.dir({ 'req >>>': req });
        connection.socket.send('hi from server');
    });
});

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 5000);
        fastify.swagger();
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

