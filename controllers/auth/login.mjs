import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../../database/db.mjs';

dotenv.config();

const login = async(req, res) =>{
    try {

        if(req.cookies?.token){
            res.clearCookie("token");
        }

        const {username, password} = req.body;

        if(!username || !password || username === "" || password === ""){
            return res.json({message : "Please fill in all the fields!", login : false });
        }

        const [user] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length < 1) {
            return res.json({ message: "User not found!", login : false });
        }

        const passwordVerify = await bcrypt.compare(password, user[0].password_hash);


        if (!passwordVerify) {
            return res.json({ message: "Incorrect password!" , login : false});
        }

        const newToken = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: "1h" });

  

        res.cookie("token", newToken, {
            httpOnly: true,  // Prevents access to the cookie via JavaScript
            secure: false,   // If you're not using HTTPS, this should be false. Set to true for HTTPS.
            sameSite: "Lax",
            maxAge: 5 * 60 * 1000, 
        });

        // console.log(newToken);

        res.status(200).json({ message: "Login successful.", token: newToken, login: true });


    } catch (error) {
        res.status(400).json({ message: "Error logging in, please try again!", login : false });
        console.error(error.message);
    }
}

export default login;