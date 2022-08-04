/* tslint:disable:no-empty */
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import { describe } from 'mocha';

import { addStorePost } from '../../controller/addStore.controller';
import { postTest, preTest } from '../index.test';

describe('add-store-controller', () => {
    preTest();

    it('new store added successfully', async () => {
        const req = {
            body: {
                "storeName": "TestName",
                "city": "TestCity",
                "state": "TestState",
                "country": "TestCountry",
                "postalCode": "TestPostalCode",
                "address": "TestAddress",
                "status": "on"
            }
        } as Request;

        const res = {
            statusCode: 500,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            },
            render: () => { }
        } as unknown as Response;

        const next: NextFunction = () => { };

        await addStorePost(req, res, next);
        expect(res).to.have.property('statusCode').equals(201);
    });

    postTest();
});