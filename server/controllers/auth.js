require('dotenv').config()
//only need secret from .env
const {SECRET} = process.env
//only need user from user.js model? 
const {User} = require('./../models/user')
//I need methods from these two libraries, not variables, so I do not need to destructure them
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


//https://stackoverflow.com/questions/48517153/what-is-signed-authentication-token
//create a token, sign token, return token. It gets verified downstream
const createToken = (username, id) => {
    return jwt.sign({ username,id},SECRET,{expiresIn: '2 days'})
}

module.exports = {
    //use async in order to not reload the page and to use await to search db 
    register: async (req, res) => {
        try {
            //check to see if the user already exists given what has been passed in to api
            const {username, password} = req.body
            //set foundUser as a user that exists, ie we found it via the .findOne method from user.js file/sequelize
            let foundUser = await User.findOne({where: {username}})
            //if the user does exist, send error message
            if (foundUser) {
                res.status(400).send('cannot create user')
                //if the user does not exist, store user name and password in the db and generate a token, pass all back in an object to front end
            } else {
                //create salt
                const salt = bcrypt.genSaltSync(10)
                //create hashed password
                const hash = bcrypt.hashSync(password, salt)
                //create new user in db (from user.js file)
                const newUser = await User.create({username, hashedPass: hash})
                //create new token
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                //create expiration date
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token,
                    exp})
            }
        } catch (error) {
            console.log('ERROR IN register')
            console.log(error)
            res.sendStatus(400)
        }
    },

    login: async (req, res) => {
        try {
            const {username, password} = req.body
            // The "foundUser" variable is assigned the result of a database query that searches for a user with the specified username.
            let foundUser = await User.findOne({where: {username}})
            //check if the user was found
            if (foundUser) {
                // The "isAuthenticated" variable is assigned the result of comparing the password provided by the user with the hashed password stored in the database for the user.
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
                //check if the password is correct
                if (isAuthenticated) {
                    //create a token for the found user that can be used when they make further requests to the server
                    const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({
                        username: foundUser.dataValues.username, 
                        userId: foundUser.dataValues.id,
                        token, 
                        exp
                    })
                } else {
                    res.status(400).send('cannot log in')
                }

            } else {
                res.status(400).send('cannot log in')
            }
        } catch (error) {
            console.log('ERROR IN register')
            console.log(error)
            res.sendStatus(400)
        }
    }
}
