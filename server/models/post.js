const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')
// creates the post model ie instantiates the table, columns, and the data types
module.exports = {
    Post : sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN
    })
}