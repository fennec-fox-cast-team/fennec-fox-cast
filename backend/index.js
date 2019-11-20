'use strict';

require('dotenv').config();

// Import Server
const fastify = require('./lib/server.js');

// Import routes
const routes = require('./lib/api/routes/routes.js');


routes.forEach(route => {
    fastify.route(route);
});


const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 5000, '0.0.0.0');
        fastify.swagger();
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

