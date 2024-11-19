const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Teacher = require('./teacher');
const Course = require('./CourseModel/course');

const TeacherCourse = sequelize.define('TeacherCourse', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  tableName: 'teacher_courses',
  timestamps: false,
});

Teacher.belongsToMany(Course, { through: TeacherCourse, foreignKey: 'teacherID', as: 'courses' });
Course.belongsToMany(Teacher, { through: TeacherCourse, foreignKey: 'courseID', as: 'teachers' });

module.exports = TeacherCourse;
