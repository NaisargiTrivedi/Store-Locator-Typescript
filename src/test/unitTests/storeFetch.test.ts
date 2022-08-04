/* tslint:disable:no-empty */
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import { describe } from 'mocha';

import { storeFetchApi, deleteStoreApi, updateStoreApi } from '../../api/storeFetch.api';
import { addStoreModel, Stores } from '../../models/addStoreModel';
import { postTest, preTest } from '../index.test';

declare global {
    namespace Express {
        interface Response {
            data: any;
        }
    }
}

describe('Store-fetch-api', () => {
   preTest();

    it('stores fetched successfully', async () => {
        const req = {} as Request;

        const res = {
            statusCode: 500,
            data: null,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            },
            send: (data: any) => {
                res.data = data;
                return res;
            }
        } as unknown as Response;

        const next: NextFunction = () => { };

        await storeFetchApi(req, res, next);
        expect(res).to.have.property('statusCode').equals(200);
        expect(res.data).to.be.an('array').length.greaterThan(0);
    });

    it('store updated successfully', async () => {
        const storeToUpdate: Stores[] = await addStoreModel.find();
        const id: string = storeToUpdate[0]._id;
        const req = {
            body: {
                "storeName": "TestNamee",
                "city": "TestCityy",
                "state": "TestStatee",
                "country": "TestCountryy",
                "postalCode": "TestPostalCodee",
                "address": "TestAddresss",
                "status": false,
                "id": id
            }
        } as Request;

        const res = {
            statusCode: 500,
            data: null,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            },
            send: (data: any) => {
                res.data = data;
                return res;
            }
        } as unknown as Response;

        const next: NextFunction = () => { };

        await updateStoreApi(req, res, next);
        expect(res).to.have.property('statusCode').equals(200);
        expect(res.data.updated).to.be.equal(true);
    });

    it('store deleted successfully', async () => {
        const storeToDelete: Stores[] = await addStoreModel.find();
        const id: string = storeToDelete[0]._id;
        const req = {
            body: {
                id,
            }
        } as Request;

        const res = {
            statusCode: 500,
            data: null,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            },
            send: (data: any) => {
                res.data = data;
                return res;
            }
        } as unknown as Response;

        const next: NextFunction = () => { };

        await deleteStoreApi(req, res, next);
        expect(res).to.have.property('statusCode').equals(200);
        expect(res.data.deleted).to.be.equal(true);
    });

   postTest();
});