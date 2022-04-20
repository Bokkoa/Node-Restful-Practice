const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const {ExceptionsHelper } = require('../helpers')

module.exports = function(req, res, next){

    const token = req.headers["authorization"];

    if(!token){
        ExceptionsHelper.HttpErrors.badRequestError('Token must be sent')
    }

    jwt.verify(token, JWT_SECRET, function(err, decodedToken){
        if( err ){
            ExceptionsHelper.HttpErrors.badRequestError('Invalid token')
        }

        req.user = decodedToken.user;
        next();
    })

}