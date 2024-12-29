import db from "../../database/database.mjs";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const login = async (req, res) => {
    try {

        res.clearCookie('token');

        const { username, password } = req.body;

        if (!username || !password || username === "" || password === "") {
            return res.json({ message: "Please fill in all the fields!", login : false });
        }

        const [user] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length < 1) {
            return res.json({ message: "User not found!", login : false });
        }

        const passwordVerify = await bcrypt.compare(password, user[0].password_hash);

        if (!passwordVerify) {
            return res.json({ message: "Incorrect password!" , login : false});
        }

        // Generate a new JWT token after successful login
        const newToken = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Set the new token in a cookie
        res.cookie("token", newToken, {
            maxAge: 168 * 60 * 60 * 1000,  // 7 days
        });

        res.status(200).json({ message: "Login successful.", token: newToken, login: true });

    } catch (error) {
        res.status(400).json({ message: "Error logging in, please try again!", login : false });
        console.error(error.message);
    }
};

export default login;
