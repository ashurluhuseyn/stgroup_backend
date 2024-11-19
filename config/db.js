const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
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