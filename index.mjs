import express from 'express';
import db from './database/database.mjs';
import dotenv from "dotenv";
import mainRouter from './router/mainRoute.mjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());

const port= process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

app.use('/api', mainRouter);