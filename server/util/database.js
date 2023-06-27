require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
// informing Sequelize of the location for your postgres database and creating an open connection so you can perform operations on that database.
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
//export sequelize
module.exports = {
    sequelize
}