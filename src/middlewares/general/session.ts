import express, { NextFunction, Response, Request, Router } from "express";
import session from "express-session";

const registerSession: Router = express.Router();

// The below code is already there in types file and it was working file but while integration testing of login-route again the logedin property became inaccessible, hence need to write it again here.
declare module 'express-session' {
    interface SessionData {
        logedin: boolean,
        destroy: () => void
    }
}

registerSession.use(session({
    secret: process.env.SESSION_KEY as string,
    resave: true,
    saveUninitialized: true
}));

const verifySession = (req: Request, res: Response, next: NextFunction): any => {
    console.log(req.session.logedin);
    if (req.session.logedin) {
        next();
    }
    else {
        console.log("else");
        res.status(440).redirect('/login');
    }
};

const destroySession = (req: Request, _res: Response, next: NextFunction): any => {
    req.session.destroy((err: any) => {
        throw new Error(err);
    });
    // res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
};

export { verifySession, destroySession, registerSession };