var jwt = require('jsonwebtoken');

const fetchuser = (req,res,next)=>{
    // get user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"invalid token"})
    }
    try {
        const data = jwt.verify(token,'jwt--secret');
        req.user = data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"invalid token"})
    }
}

module.exports = fetchuser;