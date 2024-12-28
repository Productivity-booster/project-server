import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAccessToken = async (req, res, next) => {

    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if(!token){
        return res.status(401).json({message : "Invalid or missing token!", verification : false})
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message : "Invalid or expired token!", verification : false})
        console.error(error.message)
    }   

}

export default verifyAccessToken;