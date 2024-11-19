const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Advantage = sequelize.define('Advantage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'advantages',
  timestamps: false,
});

module.exports = Advantage;
