import { NextFunction, Request } from "express";

import { addStoreModel, Stores } from '../models/addStoreModel';

const stores = async (next: NextFunction): Promise<Stores[] | any> => {
    try {
        const getStores: Stores[] = await addStoreModel.find();
        return getStores;
    }
    catch (err) {
        return next(err);
    }
};

const deleteSt = async (id: string, next: NextFunction): Promise<boolean | any> => {
    try {
        const store = await addStoreModel.findById(id);
        if (store) {
            await addStoreModel.deleteOne({ _id: id });
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return next(err);
    }
};

const update = async (req: Request, _filePath: string, next: NextFunction): Promise<boolean | any> => {
    try {
        const store = await addStoreModel.findById(req.body.id);
        if (store) {
            await addStoreModel.updateOne({ _id: req.body.id }, {
                $set: {
                    storeName: req.body.storeName,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    postalCode: req.body.postalCode,
                    address: req.body.address,
                    status: req.body.status,
                    // logoFilePath: filePath
                }
            });
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return next(err);
    }
};

export { stores, deleteSt, update };