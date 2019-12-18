'use strict';

const supertest = require('supertest');

const request = supertest('https://thawing-fortress-40899.herokuapp.com');

jest.setTimeout(30000);

describe('POST /api/login', () => {
    test('returns username, token, friendsUsernames', done => {
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: 'dima'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('200, Ok');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('username');
                expect(res.body.data).toHaveProperty('token');
                expect(res.body.data).toHaveProperty('friendsUsernames');
                done();
            });
    });

    test('returns an error if such user is not found', done => {
        request
            .post('/api/login/')
            .send({
                username: 'Dima',
                password: '123456'
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

describe('POST /api/register', () => {
    test('returns 200 and user info', done => {
        request
            .post('/api/register/')
            .send({
                username: Math.random().toString(36).substring(2, 15),
                password: Math.random().toString(36).substring(2, 15)
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('200, Ok');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('username');
                expect(res.body.data).toHaveProperty('_id');
                expect(res.body.data).toHaveProperty('friends');
                expect(res.body.data).toHaveProperty('rooms');
                done();
            });
    });

    test('returns an error if user already exists', done => {
        request
            .post('/api/register/')
            .send({
                username: 'testuser1',
                password: 'testuser1'
            })
            .expect(200)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.body).toHaveProperty('status');
                expect(res.body.status).toBe('409, Conflict');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toBe('User already exists!');
                done();
            });
    });
});

describe('POST /api/logout', () => {
    test('returns status 200 if logout is successful', done => {
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
                    .post('/api/logout/')
                    .send({
                        username: 'Dima',
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
