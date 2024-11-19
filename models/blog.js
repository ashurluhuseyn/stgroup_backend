const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Blog = sequelize.define('Blog', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
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
}, {
  tableName: 'blogs',
  timestamps: false,
});


Blog.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });
Category.hasMany(Blog, { foreignKey: 'categoryID' });

module.exports = Blog;
