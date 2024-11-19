const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const About = sequelize.define('About', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  sectionTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sectionDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  innerTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  innerDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'about',
  timestamps: false,
});

module.exports = About;