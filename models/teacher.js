const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
  courses: {
    type: DataTypes.JSON, // Kurs ID-lərini array kimi saxlamaq üçün
    allowNull: true,
    defaultValue: [], // Əvvəlcədən boş array
  },
}, {
  tableName: 'teachers',
  timestamps: false,
});

Teacher.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });

module.exports = Teacher;
