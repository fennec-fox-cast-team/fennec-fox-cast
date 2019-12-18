'use strict';

const supertest = require('supertest');

const request = supertest('https://thawing-fortress-40899.herokuapp.com');

jest.setTimeout(30000);

describe('GET /api/users/', () => {
    test('returns all users', done => {
        request
            .get('/api/users/')
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

describe('POST /api/addFriendToUser/', () => {
    test('Add friend to user by username', done => {
        let sessionToken = null;
        const friend = Math.random().toString(36).substring(2, 15);
        request
            .post('/api/register/')
            .send({
                username: friend,
                password: Math.random().toString(36).substring(2, 15)
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('200, Ok');
            });
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
                    .post('/api/addFriendToUser/')
                    .send({
                        username: 'Dima',
                        token: sessionToken,
                        friendName: friend
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

describe('POST /api/GetAllFriendsForUser/', () => {
    test('returns all user friends', done => {
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
                    .post('/api/GetAllFriendsForUser/')
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
});

describe('POST /api/GetAllRoomsForUser/', () => {
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
                    .post('/api/GetAllRoomsForUser/')
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
});

describe('DELETE /api/DeleteUserByUsername/', () => {
    test('deletes user by username', done => {
        let sessionToken = null;
        const userName = Math.random().toString(36).substring(2, 15);
        const userPassword = Math.random().toString(36).substring(2, 15);
        request
            .post('/api/register/')
            .send({
                username: userName,
                password: userPassword
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('200, Ok');
                request
                    .post('/api/login/')
                    .send({
                        username: userName,
                        password: userPassword
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body.data).toHaveProperty('token');
                        sessionToken = res.body.data.token;
                        request
                            .delete('/api/DeleteUserByUsername/')
                            .send({
                                username: userName,
                                token: sessionToken
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
