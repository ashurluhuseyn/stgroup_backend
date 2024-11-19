const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('postgres://postgres:test@localhost:5432/academy', {
    dialect: 'postgres',
    protocol: 'postgres'
})

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('SQL connection is successfull');
        
    } catch (error) {
        console.log('Error occured while connecting SQL', error);
    }
}

module.exports = { sequelize, testConnection };