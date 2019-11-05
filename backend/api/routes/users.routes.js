'use strict';

const userController = require('../../data/controllers/userController.js');

const routes = [
    // temp route
    {
        method: 'GET',
        url: '/api/users/',
        handler: userController.getAllUsers,
    },
    {
        method: 'POST',
        url: '/api/GetUserByUsername/',
        handler: userController.getUserByUsername,
    },
    {
        method: 'POST',
        url: '/api/UpdateUserByUsername/',
        handler: userController.updateUserByUsername,
    },
    {
        method: 'DELETE',
        url: '/api/DeleteUserByUsername/',
        handler: userController.deleteUserByUsername,
    },
];

module.exports = routes;
