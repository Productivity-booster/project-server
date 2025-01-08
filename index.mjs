import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './database/db.mjs';
import mainRouter from './routers/mainRouter.mjs';

dotenv.config();

const app = express();

// Middleware Setup
app.use(cookieParser()); // Parsing cookies early on
app.use(express.json()); // Parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded request bodies

// CORS Setup
app.use(cors({
    origin: true,  // Allow all origins or specify domains
    credentials: true  // Allow cookies and credentials
}));

// API Routes
app.use('/api', mainRouter);

// Basic Error Handling (Optional)
app.use((req, res, next) => {
    res.status(404).send("Route not found");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3000;  // Default to 3000 if PORT is not provided
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
