const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Course = require('./course');

const TrainingPlan = sequelize.define('TrainingPlan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  courseID: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'training_plans',
  timestamps: false,
});

module.exports = TrainingPlan;
