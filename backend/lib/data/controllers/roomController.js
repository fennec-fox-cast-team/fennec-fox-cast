'use strict';

const boom = require('@hapi/boom');

const Room = require('../models/room.js');
const User = require('../models/user.js');

exports.createNewRoom = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username, token: data.token });

        if (user && data.token !== '') {
            const room = new Room({ name: data.name, owner: user._id, messages: [], connections: [], members: [] });

            if (await Room.findOne({ name: data.name, owner: user._id })) {
                return { status: '409, Conflict', data: 'Room already exists!' };
            } else {
                data.members.push(user._id);

                for (const memberID of data.members) {
                    const member = await User.findById(memberID);

                    if (!member) continue;

                    member.rooms.push(room._id);
                    room.members.push(memberID);

                    await member.save();
                }

                return { status: '200, Ok', data: await room.save() };
            }
        } else {
            return { status: '404', data: 'User not found!' };
        }
    }  catch (err) {
        throw boom.boomify(err);
    }
};

exports.addRoomMembers = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username, token: data.token });
        const room = await Room.findById(data.room_id);

        if (user && data.token !== '') {
            if (user.rooms.indexOf(data.room_id) === -1 && !room) {
                return { status: '404', data: 'Room not found!' };
            }

            // then we must add room._id for each users
            for (const memberID of data.members) {
                const member = await User.findById(memberID);

                if (room.members.indexOf(memberID) === -1) room.members.push(memberID);

                if (member.rooms.indexOf(room._id) === -1) {
                    member.rooms.push(room._id);
                    await member.save();
                }
            }

            return { status: '200, Ok', data: await room.save() };
        } else {
            return { status: '404', data: 'User not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.GetAllRoomIdForUser = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username, token: data.token });

        if (user && data.token !== '') {
            return { status: '200, Ok', data: user.rooms };
        } else {
            return { status: '404', data: 'User not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.GetAllRoomsForUser = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username, token: data.token });

        if (user && data.token !== '') {
            const rooms = [];
            for (const roomID of user.rooms) {
                rooms.push(await Room.findById(roomID));
            }

            return { status: '200, Ok', data: rooms };
        } else {
            return { status: '404', data: 'User not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.GetAllRooms = async () => {
    try {
        return { status: '200, Ok', data: await Room.find() };
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.DeleteRoom = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username, token: data.token });

        if (user && data.token !== '') {
            const room = await Room.findById(data.room_id);

            if (!room) return { status: '404', data: 'Room not found!' };

            if (!user._id.equals(room.owner)) return { status: '403', data: 'Access denied!' };

            for (const memberID of room.members) {
                const member = await User.findById(memberID);

                if (!member) continue;

                const index = member.rooms.indexOf(data.room_id);
                if (index > -1) member.rooms.splice(index, 1);

                await member.save();
            }

            await room.remove();

            return { status: '200, Ok' };
        } else {
            return { status: '404', data: 'User not found!' };
        }
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.DeleteAllRoom = async () => {
    try {
        await Room.remove();
        return { status: '200, Ok' };
    } catch (err) {
        throw boom.boomify(err);
    }
};
