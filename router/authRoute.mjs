import { Router } from "express";
import register from "../controller/auth/register.mjs";
import login from "../controller/auth/login.mjs";
import verifyAccessToken from "../controller/auth/verifyAccesToken.mjs";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/verify', verifyAccessToken, (req, res)=>{ res.json({verification : true})});

export default authRouter;