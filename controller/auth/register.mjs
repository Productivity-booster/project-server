import db from "../../database/database.mjs";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const register = async(req, res) =>{

    try {

        const {username, email, password, birth_date, passkey}  = req.body;

        if (!username || !email || !password || !birth_date || !passkey) {
            return res.status(400).json({message : "All fields are required!"});
        }

        if(passkey != process.env.PASSKEY){
            return res.status(400).json({message : "Wrong passkey!"});
        }

        const [usernameCheck] = await db.promise().query(`Select * from users where username = ?`, [username]);

        if(usernameCheck.length>=1){
            return res.status(400).json({message : "Username already taken!"})
        }

        const saltRounds = parseInt(process.env.SALT) || 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const [addUser] = await db.promise().query(`Insert into users (username, email, password_hash, birth_date, created_at) values (?, ?, ?, ?, NOW())`, [username, email, passwordHash, birth_date])

        res.json({ message : `User ${username} registered successfully!`})
    } catch (error) {
        console.error(error.message);
        res.status(400).json({message : "Error registering, please register again!"});
    }
}

export default register;