import { Schema, model, Document } from 'mongoose';

const addStoreDbModel = new Schema({
    storeName: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    city: {
        required: true,
        type: String,
    },
    state: {
        required: true,
        type: String,
    },
    postalCode: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String,
    },
    logoFilePath: {
        type: String,
    },
    status: {
        required: true,
        default: false,
        type: Boolean
    }
});

export interface Stores extends Document {
    _id: string,
    storeName: string,
    country: string,
    city: string,
    state: string,
    postalCode: string,
    address: string,
    logoFilePath: string,
    status: boolean
}

export const addStoreModel = model<Stores>('addStoreModel', addStoreDbModel);