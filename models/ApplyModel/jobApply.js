// models/apply.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Vacancy = require('../vacancy');

const JobApply = sequelize.define('JobApply', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vacancyID: {
    type: DataTypes.INTEGER,
    references: {
      model: Vacancy,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', 
  },
  createDate: { 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
}, {
  tableName: 'applies',
  timestamps: false,
});

JobApply.belongsTo(Vacancy, { foreignKey: 'vacancyID', onDelete: 'CASCADE' });
Vacancy.hasMany(JobApply, { foreignKey: 'vacancyID', onDelete: 'CASCADE' });

module.exports = JobApply;
