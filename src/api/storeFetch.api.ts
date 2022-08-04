import { NextFunction, Request, Response } from "express";

import { storeFetch, deleteStoreService, updateStore } from "../services/storeDashboard.services";
import { Result, ValidationError, validationResult } from "express-validator";
import storeFormVal from "../utils/storeFormValidation";
import { Stores } from "../models/addStoreModel";
import { filePath } from "../middlewares/general/fileUpload";

const storeFetchApi = async (_req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
    try {
        const stores: Stores[] = await storeFetch(next);
        console.log(stores);
        if (stores.length > 0) {
            return res.status(200).send(stores);
        }
         return res.status(200).send("No stores found");
    }
    catch (err: any) {
        const error: Error = new Error(err);
        error.name = 'api';
        return next(error);
    }
};


const deleteStoreApi = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
    try {
        const deleted: boolean = await deleteStoreService(req.body.id, next);
        if (deleted) {
            return res.status(200).send({ "deleted": deleted, "errMsg": "" });
        }
        else {
            return res.status(404).send({ "deleted": deleted, "errMsg": "Store not found" });
        }
    }
    catch (err: any) {
        const error: Error = new Error(err);
        error.name = 'api';
        return next(error);
    }
};

const updateStoreApi = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
    try {
        const error: Result<ValidationError> = validationResult(req);
        if (!error.isEmpty()) {
            const errMsg: object = storeFormVal(error, req);
            return res.status(422).json(errMsg);
        }
        const updated: boolean = await updateStore(req, filePath, next);
        if (updated) {
            return res.status(200).send({ "updated": updated, "errMsg": "" });
        }
        else {
            return res.status(404).send({ "updated": updated, "errMsg": "Store not found" });
        }
    }
    catch (err: any) {
        const error: Error = new Error(err);
        error.name = 'api';
        return next(error);
    }
};

export { storeFetchApi, deleteStoreApi, updateStoreApi };