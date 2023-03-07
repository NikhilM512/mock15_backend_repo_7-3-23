
const jwt = require("jsonwebtoken")
require('dotenv').config();

const authenticationMiddleware = ( req, res, next ) => {
    
    const Token = req.headers?.authorization?.split(" ")[1]
    
    if(Token){
        const decoded = jwt.verify(Token, process.env.KEY)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }
        else{
            res.send("Please Log-In First")
        }  
    }
    else{
        res.send("Please Log-In First")
    }
}


module.exports = {authenticationMiddleware}