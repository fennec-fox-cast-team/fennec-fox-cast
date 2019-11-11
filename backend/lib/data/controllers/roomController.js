'use strict';

const boom = require('@hapi/boom');
const crypt = require('../../helpers/crypt.js');

const Room = require('../models/room.js');
const User = require('../models/user.js');

exports.createNewRoom = async req => {
    try {
        const data = req.body;
        const user = await User.findOne({ 'username': data.username });

        if (user && await crypt.compare(data.password, user.password)) {
            const room = new Room({ name: data.name, owner: user._id });

            if (await Room.findOne(room)) {
                return { status: '409, Conflict', data: 'Room already exists!' };
            } else {
                // eslint-disable-next-line require-atomic-updates
                room.members = data.members ? data.members : [];
                room.members.push(user._id);

                for (const memberID of room.members) {
                    const member = await User.findById(memberID);
                    member.rooms.push(room._id);
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
        const user = await User.findOne({ 'username': data.username });
        const room = await Room.findById(data.room_id);

        if (user.rooms.indexOf(data.room_id) === -1) {
            return { status: '404', data: 'Room not found!' };
        }

        if (user && await crypt.compare(data.password, user.password)) {

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
        const user = await User.findOne({ 'username': data.username });

        if (user && await crypt.compare(data.password, user.password)) {
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
        const user = await User.findOne({ 'username': data.username });

        if (user && await crypt.compare(data.password, user.password)) {
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
        const user = await User.findOne({ 'username': data.username });

        if (user && await crypt.compare(data.password, user.password)) {
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
