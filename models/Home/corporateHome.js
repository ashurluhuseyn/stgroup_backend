const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const CorporateHome = sequelize.define('CorporateHome', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  sectionTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sectionDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'corporate_home',
  timestamps: false,
});

module.exports = CorporateHome;
