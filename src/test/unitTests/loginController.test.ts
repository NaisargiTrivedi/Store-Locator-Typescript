/* tslint:disable:no-empty */
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { expect } from 'chai';
import { describe } from 'mocha';

import { loginPost } from '../../controller/login.controller';

// process.env.ENV = "test";

describe('login-controller', () => {
    it('user login success', async () => {
        const req = {
            body: {
                email: "admin@gmail.com",
                password: "admin@123"
            },
            session:{
                logedin:false
            }
        } as unknown as Request;

        const res = {
            statusCode: 500,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            },
            render: () => { }
        } as unknown as Response;

        const next: NextFunction = () => { };

        await loginPost(req, res, next);
        expect(res).to.have.property('statusCode').equals(200);
    });

    it('email does not exists check', async () => {
        const req = {
            body: {
                email: "admin@gmaill.com",
                password: "admin@123"
            },
            session:{
                logedin:false
            }
        } as unknown as Request;

        const res = {
            statusCode: 500,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            },
            render: () => { }
        } as unknown as Response;

        const next: NextFunction = () => { };

        await loginPost(req, res, next);
        expect(res).to.have.property('statusCode').equals(422);
    });

    it('password incorrect check', async () => {
        const req = {
            body: {
                email: "admin@gmail.com",
                password: "admin@12345"
            },
            session:{
                logedin:false
            }
        } as unknown as Request;

        const res = {
            statusCode: 500,
            status: (statusCode: number) => {
                res.statusCode = statusCode;
                return res;
            },
            render: () => { }
        } as unknown as Response;

        const next: NextFunction = () => { };

        await loginPost(req, res, next);
        expect(res).to.have.property('statusCode').equals(422);
    });
});