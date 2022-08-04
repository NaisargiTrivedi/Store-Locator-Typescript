import { stores, deleteSt, update } from "../repositories/storeDashboard.repository";
import { Stores } from "../models/addStoreModel";
import { NextFunction, Request } from 'express';

const storeFetch = async (next: NextFunction): Promise<Stores[] | any> => {
    try {
        return await stores(next);
    }
    catch (err) {
        return next(err);
    }
};

const deleteStoreService = async (id: string, next: NextFunction): Promise<boolean | any> => {
    try {
        const isStoreDeleted: boolean = await deleteSt(id, next);
        return isStoreDeleted;
    } catch (err) {
        return next(err);
    }
};

const updateStore = async (req: Request, filePath: string, next: NextFunction): Promise<boolean | any> => {
    try {
        const isStoreUpdated: boolean = await update(req, filePath, next);
        return isStoreUpdated;
    }
    catch (err) {
        return next(err);
    }
};

export { storeFetch, deleteStoreService, updateStore };