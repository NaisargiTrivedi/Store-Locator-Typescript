import 'dotenv/config';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import http from 'chai-http';
import { readFileSync } from 'fs';

import app from '../../app';
import path from 'path';
import { addStoreModel } from '../../models/addStoreModel'
import { postTest, preTest } from '../index.test';

chai.use(http);

describe('update-store-route-test', () => {
    preTest();

    it('store updated successfully', async () => {
        let id: string;
        const storeToBeUpdated = await addStoreModel.find();
        id = (storeToBeUpdated[0]._id).toString();
        chai.request(app)
            .post('/stores/updateStoreApi')
            .attach('logo', readFileSync(path.resolve(__dirname, '../../public/Login_v15/images/logout.png')), 'logout.png')
            .field("id", id)
            .field("storeName", "TestNameU")
            .field("city", "TestCityU")
            .field("state", "TestStateU")
            .field("country", "TestCountryI")
            .field("postalCode", "TestPostalCodeI")
            .field("address", "TestAddressI")
            .field("status", false)
            .end((_err, res) => {
                expect(res).to.have.status(200);
            })
    });

    it('update-store validation error (express-validator)', (done) => {
        chai.request(app)
            .post('/stores/updateStoreApi')
            .attach('logo', readFileSync(path.resolve(__dirname, '../../public/Login_v15/images/logout.png')), 'logout.png')
            .field("storeName", "")
            .field("city", "TestCityU")
            .field("state", "TestStateU")
            .field("country", "TestCountryI")
            .field("postalCode", "TestPostalCodeI")
            .field("address", "TestAddressI")
            .field("status", false)
            .end((_err, res) => {
                expect(res).to.have.status(422);
                done();
            })
    });

    postTest();
});