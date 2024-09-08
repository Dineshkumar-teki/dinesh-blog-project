import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(res.cookies)
    if (!token){
        console.log(token, 'hi')
        return next(errorHandler(403,"Unauthorized"))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(errorHandler(401, 'Unauthorized'))
        }
        req.user = user;
        next();
    })
}