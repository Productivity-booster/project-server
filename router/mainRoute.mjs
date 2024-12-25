import {Router} from 'express'
import userRouter from './userRoute.mjs';
import assignmentRouter from './assignmentRoute.mjs';

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/assignment', assignmentRouter);

export default mainRouter;



