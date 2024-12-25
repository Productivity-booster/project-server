import db from "../../database/database.mjs";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const login = async (req, res) =>{
    try {
        const {username, password} = req.body;

        if(!username || !password){
            return res.json({message: "Please fill in all the fields!"});
        }
        
        const [user] = await db.promise().query('select * from users where username = ?', [username]);

        if(user.length<1){
            return res.json({message : "User not found!"});
        }

        const passwordverify = await bcrypt.compare(password, user[0].password_hash);

        if(!passwordverify){
            return res.json({message : "Incorrect password!"});
        }

        const token = jwt.sign({username : username}, process.env.JWT_SECRET, {expiresIn : "3h"});

        res.cookie("token", token, {
            httpOnly : true,
            sameSite : "Strict",
            maxAge: 168 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful.", token });

    } catch (error) {
        res.status(400).json({message : "Error logging in, please try again!"});
        console.error(error.message)
    }
}

export default login;