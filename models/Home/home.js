const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Home = sequelize.define('Home', {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  innerTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  innerDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  option1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  option2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  option3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  option4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'home',
  timestamps: false,
});

module.exports = Home;
