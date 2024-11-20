const { sequelize } = require('../config/db');
const Teacher = require('./teacher');
const Course = require('./CourseModel/course');
const Category = require('./category');

// Əlaqələri burda təyin edin
Teacher.belongsToMany(Course, { through: 'TeacherCourse', as: 'courses', foreignKey: 'teacherID' });
Course.belongsToMany(Teacher, { through: 'TeacherCourse', as: 'teachers', foreignKey: 'courseID' });

Teacher.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });
Course.belongsTo(Category, { foreignKey: 'categoryID', as: 'category' });

module.exports = {
  sequelize,
  Teacher,
  Course,
  Category,
};