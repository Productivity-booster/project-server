import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../database/db.mjs";

dotenv.config();

const verify = async(req, res, next) =>{

    if(!req.cookies?.token) {
        return res
          .status(401)
          .json({ message: "No token provided!", verification: false });
    }

    const token = req.cookies.token;

    // console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [user_id] = await db
      .promise()
      .query(`SELECT user_id from users where username = ?`, [
        decoded.username,
      ]);

      decoded.user_id = user_id[0].user_id;
      req.user = decoded;
      
      // console.log(token);
      next();
      
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token!", verification: false });
        console.error("", error.message);
    }
}

export default verify;