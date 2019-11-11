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
        method: 'POST',
        url: '/api/addFriendToUser/',
        handler: userController.addFriendToUser,
    },
    {
        method: 'POST',
        url: '/api/GetAllFriendsForUser/',
        handler: userController.getAllFriendsForUser,
    },
    {
        method: 'POST',
        url: '/api/GetAllRoomsForUser/',
        handler: userController.getAllRoomsForUser,
    },
    {
        method: 'DELETE',
        url: '/api/DeleteUserByUsername/',
        handler: userController.deleteUserByUsername,
    },
    {
        method: 'DELETE',
        url: '/api/deleteFriend/',
        handler: userController.deleteFriend,
    },
];

module.exports = routes;
