import 'dotenv/config';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import http from 'chai-http';

import app from '../../app';
import { addStoreModel } from '../../models/addStoreModel';
import { postTest, preTest } from '../index.test';

chai.use(http);

describe('delete-store-route-test', () => {
    preTest();

    it('store to be deleted not found!', (done) => {
        chai.request(app)
            .post('/stores/deleteStore')
            .send({
                "id": "62e38761d3d61a5a34315840"
            })
            .end((_err, res) => {
                expect(res).to.have.status(404);
                done();
            })
    });

    it('store deleted successfully', (done) => {
        let id: string;
        addStoreModel.find().then((storeToDelete) => {
            id = storeToDelete[0]._id;
            chai.request(app)
                .post('/stores/deleteStore')
                .send({
                    "id": id
                })
                .end((_err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        });
    });

    postTest();
});