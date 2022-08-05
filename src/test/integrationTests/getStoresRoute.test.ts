import 'dotenv/config';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import http from 'chai-http';

import app from '../../app';
import { addStoreModel } from '../../models/addStoreModel'
import { postTest, preTest } from '../index.test';

chai.use(http);

describe('get-stores-route-test', () => {
  preTest();

    it('fetch stores successfully', (done) => {
        chai.request(app)
            .get('/stores/storeDataFetchApi')
            .end((_err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });

    it('no stores found', (done) => {
        addStoreModel.deleteMany().then(() => {
            chai.request(app)
                .get('/stores/storeDataFetchApi')
                .end((_err, res) => {
                    console.log(res);
                    expect(res).to.have.status(200);
                    expect(res.text).to.be.equal('[]');
                    done();
                })
        });
    });

   postTest();
});