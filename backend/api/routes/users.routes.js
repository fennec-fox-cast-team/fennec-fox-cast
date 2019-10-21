'use strict';

const userController = require('../../data/controllers/userController.js');

const routes = [
    {
        method: 'GET',
        url: '/api/users',
        handler: userController.getAllUsers
    },
    {
        method: 'GET',
        url: '/api/users/:id',
        handler: userController.getUserById
    },
    {
        method: 'POST',
        url: '/api/users/:id',
        handler: userController.updateUserById
    },
    {
        method: 'DELETE',
        url: '/api/users/:id',
        handler: userController.deleteUserById
    },
    {
        method: 'DELETE',
        url: '/api/users/username',
        handler: userController.deleteUserByUsername
    }
];

module.exports = routes;
