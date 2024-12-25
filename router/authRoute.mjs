import { Router } from "express";
import register from "../controller/auth/register.mjs";
import login from "../controller/auth/login.mjs";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;