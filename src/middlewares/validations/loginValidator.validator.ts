import { body, ValidationChain } from 'express-validator';

const loginValidations: ValidationChain[] = [
    body('email')
        .isEmail()
        .withMessage("Enter a valid email")
        .bail()
        .normalizeEmail(),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("Please enter your password to continue")

];

export default loginValidations;