'use strict';

const loginController = require('../../data/controllers/loginController.js');
const registerController = require('../../data/controllers/registerController.js');

const routes = [
    {
        method: 'POST',
        url: '/api/login',
        handler: loginController.login,
    },
    {
        method: 'POST',
        url: '/api/register',
        handler: registerController.addUser,
    },
    {
        method: 'POST',
        url: '/api/logout',
        handler: loginController.logout,
    },
];

module.exports = routes;
