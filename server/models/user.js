//sequelize is gonna create a model for the schema based on these files

//need to define data type 
const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    //this is the model User is technically a class which is why it's capital
    //define is what defines the intial table, what it's called, what the columns are and what their data type is
    User : sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING
    })
}