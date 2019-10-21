'use strict';

const userRoutes = require('./users.routes.js');
const authRoutes = require('./auth.routes.js');

module.exports = Array.prototype.concat(userRoutes, authRoutes);
