import express from 'express';
import db from './database/database.mjs';
import dotenv from "dotenv";
import mainRouter from './router/mainRoute.mjs';
import cors from 'cors';

dotenv.config(); 

const app = express();

app.use(cors());

const port= process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

app.use('/api', mainRouter);