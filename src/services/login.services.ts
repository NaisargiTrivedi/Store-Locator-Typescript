import { NextFunction, Request } from "express";

import { loginCredential } from "../repositories/login.repository";

const login = async (req: Request, next: NextFunction): Promise<string | any> => {
    try {
        const loginDetails: string  = await loginCredential(req.body.email, req.body.password, next);
        if (loginDetails === 'Email does not exists') {
            return 'Email does not exists';
        }
        if (loginDetails === 'Incorrect Password') {
            return 'Incorrect Password';
        }
        if (loginDetails === 'Login Successful') {
            return 'Login Successful';
        }
        return '';
    }
    catch (err) {
        return next(err);
    }
};

export default login;