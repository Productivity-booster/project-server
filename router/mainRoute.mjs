import {Router} from 'express'
import userRouter from './userRoute.mjs';
import assignmentRouter from './assignmentRoute.mjs';
import authRouter from './authRoute.mjs';

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/assignment', assignmentRouter);

export default mainRouter;



