const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Category = require('../category');  // Correct the import path

const Course = sequelize.define('Course', {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  viewCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: 'courses',
  timestamps: false,
});

// Define the relationship after the model definition
Course.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });

module.exports = Course;
