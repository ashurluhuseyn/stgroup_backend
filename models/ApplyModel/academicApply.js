const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Course = require('../CourseModel/course');

const AcademicApply = sequelize.define('AcademicApply', {
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
  },
  courseID: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE', 
  },
}, {
  tableName: 'academic_applies',
  timestamps: false
});

AcademicApply.belongsTo(Course, { foreignKey: 'courseID', as: 'course' });

module.exports = AcademicApply;
