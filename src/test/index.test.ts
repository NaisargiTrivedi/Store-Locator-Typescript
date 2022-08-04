import { addStoreModel } from '../models/addStoreModel';

export const preTest = () => {
    return before(async () => {
        return await addStoreModel.create({
            "storeName": "TestName",
            "city": "TestCity",
            "state": "TestState",
            "country": "TestCountry",
            "postalCode": "TestPostalCode",
            "address": "TestAddress",
            "status": true
        });
    })
}

export const postTest = () => {
    return after(async () => {
        return await addStoreModel.deleteMany()
    })
}