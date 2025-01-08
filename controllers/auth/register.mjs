import db from '../../database/db.mjs';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const register = async(req, res) =>{
    try {

        const {username, email, password, birth_date, passkey, timezone}  = req.body;

        if (!username || !email || !password || !birth_date || !passkey || !timezone || username === "" || email === "" || password === "" || birth_date === "" || passkey === "" || timezone === "") {
            return res.status(400).json({message : "All fields are required!", registrationSuccessful : false});
        }

        if(passkey != process.env.PASSKEY){
            return res.status(400).json({message : "Wrong passkey!", registrationSuccessful : false});
        }

        const [usernameCheck] = await db.promise().query(`Select * from users where username = ?`, [username]);

        if(usernameCheck.length>=1){
            return res.status(400).json({message : "Username already taken!", registrationSuccessful : false});
        }

        const saltRounds = parseInt(process.env.SALT) || 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const [addUser] = await db.promise().query(`Insert into users (username, email, password_hash, birth_date, created_at, timezone) values (?, ?, ?, ?, NOW(), ?)`, [username, email, passwordHash, birth_date, timezone])

        res.json({ message : `User ${username} registered successfully!`, registrationSuccessful : true})

    } catch (error) {
        console.error(error.message);
        res.status(400).json({message : "Error during registration, please register again!"});
    }
}

export default register;