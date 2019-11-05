'use strict';

const roomController = require('../../data/controllers/roomController.js');

const routes = [
    {
        method: 'POST',
        url: '/api/rooms/addRoomMembers/',
        handler: roomController.addRoomMembers,
    },
    {
        method: 'POST',
        url: '/api/rooms/createNewRoom/',
        handler: roomController.createNewRoom,
    },
    {
        method: 'POST',
        url: '/api/rooms/GetAllRoomIdForUser/',
        handler: roomController.GetAllRoomIdForUser,
    },
    {
        method: 'POST',
        url: '/api/rooms/GetAllRoomsForUser/',
        handler: roomController.GetAllRoomsForUser,
    },
    {
        method: 'DELETE',
        url: '/api/rooms/DeleteRoom/',
        handler: roomController.DeleteRoom,
    },
    // temp route
    {
        method: 'DELETE',
        url: '/api/rooms/DeleteAllRoom/',
        handler: roomController.DeleteAllRoom,
    },
    // temp route
    {
        method: 'GET',
        url: '/api/rooms/GetAllRooms/',
        handler: roomController.GetAllRooms,
    },
];

module.exports = routes;
