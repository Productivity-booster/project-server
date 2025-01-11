import { Router } from "express";
import authRouter from "./authRouter.mjs";
import mainPageRouter from "./pageRouters/mainPageRouter.mjs";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/mainPage", mainPageRouter);

export default mainRouter;
