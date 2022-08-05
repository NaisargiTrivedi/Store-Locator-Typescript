import 'dotenv/config';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import http from 'chai-http';

import app from '../../app';

chai.use(http);

describe('login-route-test', () => {
    it('user must be able to login successfully', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                "email": "admin@gmail.com",
                "password": "admin@123"
            })
            .end((_err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('validation error for password incorrect', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                "email": "admin@gmail.com",
                "password": "admin@12345"
            })
            .end((_err, res) => {
                expect(res).to.have.status(422);
                done();
            })
    });

    it('validation error for email does not exist', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                "email": "admin@gmaill.com",
                "password": "admin@123"
            })
            .end((_err, res) => {
                expect(res).to.have.status(422);
                done();
            })
    });

    it('validation error for valid email format (express-validator)', (done) => {
        chai.request(app)
            .post('/login')
            .send({
                "email": "admin",
                "password": "admin@123"
            })
            .end((_err, res) => {
                expect(res).to.have.status(422);
                done();
            })
    });
});