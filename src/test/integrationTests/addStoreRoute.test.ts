import 'dotenv/config';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import http from 'chai-http';
import { readFileSync } from 'fs';

import app from '../../app';
import path from 'path';
import { postTest, preTest } from '../index.test';

chai.use(http);

describe('addStore-route-test', () => {
    preTest();

    it('store added successfully', (done) => {
        chai.request(app)
            .post('/stores/addStore')
            .attach('logo', readFileSync(path.resolve(__dirname, '../../public/Login_v15/images/logout.png')), 'logout.png')
            .field("storeName", "TestNameI")
            .field("city", "TestCityI")
            .field("state", "TestStateI")
            .field("country", "TestCountryI")
            .field("postalCode", "TestPostalCodeI")
            .field("address", "TestAddressI")
            .field("status", "on")
            .end((_err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('add-store validation error (express-validator)', (done) => {
        chai.request(app)
            .post('/stores/addStore')
            .attach('logo', readFileSync(path.resolve(__dirname, '../../public/Login_v15/images/logout.png')), 'logout.png')
            .field("storeName", "")
            .field("city", "TestCityI")
            .field("state", "TestStateI")
            .field("country", "TestCountryI")
            .field("postalCode", "TestPostalCodeI")
            .field("address", "TestAddressI")
            .field("status", "on")
            .end((_err, res) => {
                expect(res).to.have.status(422);
                done();
            })
    });

    postTest();
});