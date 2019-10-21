'use strict';

const loginController = require('../../data/controllers/loginController.js');

const routes = [
    {
        method: 'POST',
        url: '/api/login',
        handler: loginController.login
    }
];

module.exports = routes;
