import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

import login from '../services/login.services';

// The below code is already there in types file and it was working file but while integration testing of login-route again the logedin property became inaccessible, hence need to write it again here.
declare module 'express-session' {
    interface SessionData {
        logedin: boolean,
        destroy: () => void
    }
}

const loginGet = (_req: Request, res: Response): any => {
    return res.render('login');
};

const loginPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const error: Result<ValidationError> = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).render('login', { error, req });
        }
        const loginDetails: string = await login(req, next);
        if (loginDetails === 'Email does not exists') {
            const emailIncorrect: object = { email: true };
            return res.status(422).render('login', { emailIncorrect });
        }
        else if (loginDetails === 'Incorrect Password') {
            const passwordIncorrect: object = { password: true };
            return res.status(422).render('login', { passwordIncorrect });
        }
        else {
            req.session.logedin = true;
            return res.status(200).redirect('stores/dashboard');
        }
    }
    catch (err) {
        return next(err);
    }
};

const logout = (_req: Request, res: Response): any => {
    return res.redirect('/login');
};

export { loginGet, loginPost, logout };