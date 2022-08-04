import 'dotenv/config';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import http from 'chai-http';

import app from '../../app';

chai.use(http);

describe('get routes working perfecting for logedin user', () => {
    before(() => {
        chai.request(app)
            .post('/login')
            .send({
                "email": "admin@gmail.com",
                "password": "admin@123"
            })
    })

    it('list stores route', (done) => {
        chai.request(app)
            .get('/stores/dashboard')
            .end((_err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('add stores route', (done) => {
        chai.request(app)
            .get('/stores/addStore')
            .end((_err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });

    after(() => {
        chai.request(app)
            .get('/logout')
    })

});