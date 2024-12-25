import {Router} from 'express'
import verifyAccessToken from '../controller/auth/verifyAccesToken.mjs';
import getAllAssignment from '../controller/assignment/getAllAssignment.mjs';

const assignmentRouter = Router();

assignmentRouter.get('/', verifyAccessToken, getAllAssignment);

export default assignmentRouter;