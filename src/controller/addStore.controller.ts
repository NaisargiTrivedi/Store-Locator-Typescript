import { NextFunction, Request, Response } from "express";

import addStore from '../services/addStore.services';
import { filePath } from '../middlewares/general/fileUpload';
import storeFormVal from '../utils/storeFormValidation';
import { Result, ValidationError, validationResult } from 'express-validator';

const addStoreGet = (_req: Request, res: Response): any => {
    return res.render('addStore');
}

const addStorePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const error: Result<ValidationError> = validationResult(req);
        if (!error.isEmpty()) {
            const errMsg: object = storeFormVal(error, req);
            return res.status(422).render('addStore', { errMsg, req });
        }
        await addStore(req, filePath, next);

        // Use this response for testing...because redirect will change the status code to 200.
         // return res.status(201).send("added");

         return res.status(201).redirect('/stores/dashboard');
    }
    catch (err) {
        return next(err);
    }
}

export { addStoreGet, addStorePost };