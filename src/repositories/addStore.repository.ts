import { NextFunction } from "express";
import { Stores } from "../models/addStoreModel";

const addStoreDB = async (save: Stores, next: NextFunction): Promise<boolean | any> => {
    try {
        await save.save();
        return true;
    }
    catch (err) {
        return next(err);
    }
}

export default addStoreDB;