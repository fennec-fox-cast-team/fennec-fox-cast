'use strict';

const supertest = require('supertest');

const request = supertest('https://thawing-fortress-40899.herokuapp.com');

jest.setTimeout(30000);

describe('POST /api/rooms/createNewRoom', () => {
    test('returns status 200 and info if room was created', done => {
        let sessionToken = null;
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: 'dima'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body.data).toHaveProperty('token');
                sessionToken = res.body.data.token;
                request
                    .post('/api/rooms/createNewRoom/')
                    .send({
                        name: Math.random().toString(36).substring(2, 15),
                        username: 'Dima',
                        token: sessionToken,
                        members: [
                            '5de5288205d42629ee3e55c5'
                        ]
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('status');
                        expect(res.body.status).toBe('200, Ok');
                        expect(res.body).toHaveProperty('data');
                        expect(res.body.data).toHaveProperty('_id');
                        done();
                    });
            });
    });

    test('returns alert that room already exists', done => {
        let sessionToken = null;
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: 'dima'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body.data).toHaveProperty('token');
                sessionToken = res.body.data.token;
                request
                    .post('/api/rooms/createNewRoom/')
                    .send({
                        name: 'testroom',
                        username: 'Dima',
                        token: sessionToken,
                        members: [
                            '5de5288205d42629ee3e55c5'
                        ]
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('status');
                        expect(res.body.status).toBe('409, Conflict');
                        expect(res.body).toHaveProperty('data');
                        expect(res.body.data).toBe('Room already exists!');
                        done();
                    });
            });
    });

    test('returns alert with incorrect input data', done => {
        request
            .post('/api/rooms/createNewRoom/')
            .send({
                name: 'room',
                username: 'doesntexist',
                members: [
                    '5de5288205d42629ee3e55c5'
                ]
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('404');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toBe('User not found!');
                done();
            });
    });
});

describe('POST /api/rooms/addRoomMembers', () => {
    test('add new member to the room', done => {
        let sessionToken = null;
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: 'dima'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body.data).toHaveProperty('token');
                sessionToken = res.body.data.token;
                request
                    .post('/api/rooms/addRoomMembers/')
                    .send({
                        // eslint-disable-next-line camelcase
                        room_id: '5dd4407d24da6f65df043af7',
                        username: 'Dima',
                        token: sessionToken,
                        members: [
                            '5de5288205d42629ee3e55c5'
                        ]
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('status');
                        expect(res.body.status).toBe('200, Ok');
                        expect(res.body).toHaveProperty('data');
                        done();
                    });
            });
    });

    test('returns alert if room was not found', done => {
        let sessionToken = null;
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: 'dima'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body.data).toHaveProperty('token');
                sessionToken = res.body.data.token;
                request
                    .post('/api/rooms/addRoomMembers/')
                    .send({
                        // eslint-disable-next-line camelcase
                        room_id: 'doesnotexist',
                        username: 'Dima',
                        token: sessionToken,
                        members: [
                            '5de5288205d42629ee3e55c5'
                        ]
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('status');
                        expect(res.body.status).toBe('404');
                        expect(res.body).toHaveProperty('data');
                        expect(res.body.data).toBe('Room not found!');
                        done();
                    });
            });
    });
});

describe('POST /api/rooms/GetAllRoomIdForUser/', () => {
    test('returns all user rooms', done => {
        let sessionToken = null;
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: 'dima'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body.data).toHaveProperty('token');
                sessionToken = res.body.data.token;
                request
                    .post('/api/rooms/GetAllRoomIdForUser/')
                    .send({
                        username: 'Dima',
                        token: sessionToken
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('status');
                        expect(res.body.status).toBe('200, Ok');
                        expect(res.body).toHaveProperty('data');
                        done();
                    });
            });
    });

    test('returns 404 if user was not found', done => {
        request
            .post('/api/rooms/GetAllRoomIdForUser/')
            .send({
                username: 'doesnotexist'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('404');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toBe('User not found!');
                done();
            });
    });
});

describe('POST /api/rooms/DeleteRoom/', () => {
    test('deletes room by id', done => {
        let sessionToken = null;
        let roomID = null;
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: 'dima'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body.data).toHaveProperty('token');
                sessionToken = res.body.data.token;
                request
                    .post('/api/rooms/createNewRoom/')
                    .send({
                        name: 'delete_room',
                        username: 'Dima',
                        token: sessionToken,
                        members: []
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('status');
                        expect(res.body.status).toBe('200, Ok');
                        expect(res.body).toHaveProperty('data');
                        expect(res.body.data).toHaveProperty('_id');
                        roomID = res.body.data._id;
                        request
                            .delete('/api/rooms/DeleteRoom/')
                            .send({
                                username: 'Dima',
                                token: sessionToken,
                                // eslint-disable-next-line camelcase
                                room_id: roomID
                            })
                            .expect(200)
                            .end((err, res) => {
                                expect(err).toBeNull();
                                expect(res.body).toHaveProperty('status');
                                expect(res.body.status).toBe('200, Ok');
                                done();
                            });
                    });
            });
    });
});

describe('GET /api/rooms/GetAllRooms/', () => {
    test('returns all rooms', done => {
        request
            .get('/api/rooms/GetAllRooms/')
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('200, Ok');
                expect(res.body).toHaveProperty('data');
                done();
            });
    });
});
