import { NextFunction, Request } from "express";

import { addStoreModel, Stores } from "../models/addStoreModel";
import addStoreDB from "../repositories/addStore.repository";

const addStore = async (req: Request, filePath: string, next: NextFunction): Promise<boolean | any> => {
    try {
        let status: boolean;
        if (req.body.status === "on") {
            status = true;
        }
        else {
            status = false;
        }
        const path = filePath ? filePath : "";
        const save: Stores = new addStoreModel({
            "storeName": req.body.storeName,
            "city": req.body.city,
            "state": req.body.state,
            "country": req.body.country,
            "postalCode": req.body.postalCode,
            "address": req.body.address,
            "logoFilePath": path,
            "status": status
        });
        await addStoreDB(save, next);
        return true;
    }
    catch (err) {
        return next(err);
    }
};

export default addStore;