'use strict';

const userRoutes = require('./users.routes.js');
const authRoutes = require('./auth.routes.js');

const roomRoutes = require('./room.routes.js');

module.exports = Array.prototype.concat(userRoutes, authRoutes, roomRoutes);
