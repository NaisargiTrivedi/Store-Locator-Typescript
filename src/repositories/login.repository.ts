import bcryptjs from "bcryptjs";
import { NextFunction } from "express";
import Model from "sequelize/types/model";
import userModel, { UserAttributes, UserCreationAttributes } from "../models/userModel";

const loginCredential = async (emailReq: string, passwordReq: string, next: NextFunction): Promise<string | any> => {
    try {
        const email: Model<UserAttributes, UserCreationAttributes> | null = await userModel.findOne(
            { where: { email: emailReq } }
        );
        console.log("emailreq..................",emailReq);
        console.log("emaildb....................",email);
        if (email != null) {
            const passwordVerified: boolean = await bcryptjs.compare(passwordReq, email?.getDataValue("password"));
            if (passwordVerified) {
                return 'Login Successful';
            }
            else {
                return 'Incorrect Password';
            }
        }
        else {
            return 'Email does not exists';
        }
    }
    catch (err) {
        return next(err);
    }
};

export { loginCredential };