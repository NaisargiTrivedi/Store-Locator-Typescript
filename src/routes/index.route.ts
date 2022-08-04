import express, { Router, Request, Response, NextFunction } from 'express';

import loginRoute from './login.routes';
import storeRoute from './stores.routes';

const router: Router = express.Router();

router.use('/login', loginRoute);
router.use('/stores', storeRoute);

router.use((_req: Request, res: Response): any => {
    return res.status(404).render('notFound');
});

router.use((err: Error, _req: Request, res: Response, _next: NextFunction): Response | any => {
    if (err.name === 'api') {
        return res.status(500).send({
            "status": false,
            "msg": "Something Went Wrong!!!",
            "error": err
        });
    }
    else {
        return res.status(500).render('error');
    }
});

export default router;