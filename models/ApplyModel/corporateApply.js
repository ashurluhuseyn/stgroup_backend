// models/CorporateApply.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const CorporateApply = sequelize.define('CorporateApply', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM,
    values: ['gözləmədə', 'təsdiqlənmiş', 'silinmiş'],
    defaultValue: 'gözləmədə',
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'corporate_apply',
  timestamps: false
});

module.exports = CorporateApply;
