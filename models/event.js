const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Category = require('./category');

const Event = sequelize.define('Event', {
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
    type: DataTypes.STRING,
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
  tableName: 'events',
  timestamps: false,
});

Event.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });
Category.hasMany(Event, { foreignKey: 'categoryID' });


module.exports = Event;
