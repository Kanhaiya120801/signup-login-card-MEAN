const jwt = require('jsonwebtoken');
const config = require('./config');


exports.getToken = (user) => {
    return jwt.sign(user, config.SecretKey, { expiresIn: config.token_expire });
}

exports.verifyJWT = (req,res,next) =>{
    console.log("req header",req.header('token'))
    const authHeader = req.header('token')
    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, config.SecretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}