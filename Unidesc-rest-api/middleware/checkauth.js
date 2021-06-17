const jsonwebtoken = require('jsonwebtoken');
const { token } = require('morgan');


module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const privatekey = process.env.PRIVATE_KEY;

        const decoded = jsonwebtoken.verify(token, privatekey, {algorithm:'HS256'});
        next();
    } catch (error) {
        return res.status(401).json({
            message:"usuário não autenticado"
        });
    }
    

};