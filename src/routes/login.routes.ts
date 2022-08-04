import express, { Router } from "express";
import { loginGet, loginPost } from "../controller/login.controller";
import { loginValidations } from "../middlewares/index.middleware";

const loginRoute: Router = express.Router();

loginRoute.get('', loginGet);

loginRoute.post('', loginValidations, loginPost);

export default loginRoute;