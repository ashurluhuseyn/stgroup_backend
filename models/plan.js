const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FieldPlan = sequelize.define('FieldPlan', {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'plans',
  timestamps: false,
});

module.exports = FieldPlan;
