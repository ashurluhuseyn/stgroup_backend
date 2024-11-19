// models/vacancy.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Vacancy = sequelize.define('Vacancy', {
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
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.ENUM('full-time', 'part-time', 'intern', 'remote'),
    allowNull: false,
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  duties: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  conditions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  applyCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  tableName: 'vacancies',
  timestamps: false,
});

Vacancy.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });
Category.hasMany(Vacancy, { foreignKey: 'categoryID' });

module.exports = Vacancy;
