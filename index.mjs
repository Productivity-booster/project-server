import express from 'express';
import db from './database/database.mjs';

const app = express();

const port= process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})