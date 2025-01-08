import { Router } from "express";
import login from "../controllers/auth/login.mjs";
import register from "../controllers/auth/register.mjs";
import verify from "../controllers/auth/verify.mjs";
import checkToken from "../controllers/auth/checkToken.mjs";
import logout from "../controllers/auth/logout.mjs";

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/checkToken', verify, checkToken);
authRouter.get('/logout', logout);

export default authRouter;