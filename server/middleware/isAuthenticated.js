// .env is where the secrets are stored, so bring those in 
require('dotenv').config()
//set jwt as an imported package for creating and verifiying web tokens
const jwt = require('jsonwebtoken')
//destructures the secret variable from .env file
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        //retrieves an authorization variable in the header and assigns to headerToken
        const headerToken = req.get('Authorization')
        //if the header token is missing, that means...what? middleware is broken? 
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            //attempts to verify the JWT in the `Authorization` header using the jwt verify method
            //assigns decoded token to token variable
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        //if there is no token, don't authenticate and serve error
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        //calls the next function in the middleware chain
        next()
    }
}