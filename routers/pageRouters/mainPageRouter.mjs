import { Router } from "express";
import verify from "../../controllers/auth/verify.mjs";
import getAllNotification from "../../controllers/mainPage/getAllNotification.mjs";
import getPercentages from "../../controllers/mainPage/getPercentages.mjs";

const mainPageRouter = Router();

mainPageRouter.get("/getNotifications", verify, getAllNotification);
mainPageRouter.get("/getPercentages/:type", verify, getPercentages);

export default mainPageRouter;
