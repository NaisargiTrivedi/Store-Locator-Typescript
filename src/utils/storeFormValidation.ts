import { Request } from "express";

const storeFormVal = (error: any, req: Request) => {
    const errMsg = {
        validationError: true,
        storeVal: '',
        cityVal: '',
        stateVal: '',
        countryVal: '',
        addVal: '',
        postalVal: '',
        req: req.body,
    };
    for (const e of error.errors) {
        if (e.param === 'storeName') {
            errMsg.storeVal = e.msg;
        }
        else if (e.param === 'city') {
            errMsg.cityVal = e.msg;
        }
        else if (e.param === 'state') {
            errMsg.stateVal = e.msg;
        }
        else if (e.param === 'country') {
            errMsg.countryVal = e.msg;
        }
        else if (e.param === 'address') {
            errMsg.addVal = e.msg;
        }
        else {
            errMsg.postalVal = e.msg;
        }
    }
    return errMsg;
};

export default storeFormVal;