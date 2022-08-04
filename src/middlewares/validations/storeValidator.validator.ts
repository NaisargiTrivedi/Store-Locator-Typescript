import { body, ValidationChain } from "express-validator";

const addStoreValidation: ValidationChain[] = [
    body('storeName')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Enter valid storeName'),
    body('city')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Enter valid city'),
    body('state')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Enter valid state'),
    body('address')
        .trim()
        .isLength({ min: 7 })
        .withMessage('Enter valid address'),
    body('postalCode')
        .trim()
        .isLength({ min: 4 })
        .withMessage('Enter valid postalcode'),
    body('country')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Enter valid country')
];

export default addStoreValidation;