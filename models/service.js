const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Service = sequelize.define('Service', {
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
  description2: {
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
  tableName: 'services',
  timestamps: false,
});

Service.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });
Category.hasMany(Service, { foreignKey: 'categoryID' });


module.exports = Service;
