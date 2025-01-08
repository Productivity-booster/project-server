import { Router } from "express";
import verify from "../../controllers/auth/verify.mjs";
import getAllNotification from "../../controllers/mainPage/getAllNotification.mjs";

const mainPageRouter = Router();

mainPageRouter.get('/getNotifications', verify, getAllNotification);

export default mainPageRouter;