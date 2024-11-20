const fs = require('fs')
const path = require('path');
const Course = require('../../models/CourseModel/course');
const Category = require('../../models/category');
const Teacher = require('../../models/teacher');
const FieldPlan = require('../../models/plan');
const TrainingPlan = require('../../models/CourseModel/trainingPlan');

const createCourse = async (req, res) => {
  try {
    const { title, description, categoryID } = req.body;

    const image = req.files['image'] ? req.files['image'][0].filename : null;
    const icon = req.files['icon'] ? req.files['icon'][0].filename : null;

    const newCourse = await Course.create({
      title,
      description,
      categoryID,
      image,
      icon
    });

    res.status(201).json({ message: 'Course created successfully', data: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating course', error });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();

    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found' });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving courses', error });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving course', error });
  }
};

const getDataForCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const [
      course,
      otherCourses,
      allTeachers,
      trainingPlans,
      plans
    ] = await Promise.all([
      Course.findOne({
        where: { id },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['title'],
          },
        ],
      }),
      Course.findAll({ limit: 6 }),
      Teacher.findAll({
        attributes: ['id', 'fullname', 'image', 'description', 'courses'],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['title'],
          },
        ],
      }),
      TrainingPlan.findAll({ where: { courseID: id } }),
      FieldPlan.findAll({
        attributes: ['id', 'title', 'description', 'image'],
      }),
    ]);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.increment('viewCount', { by: 1 });

    const filteredTeachers = allTeachers.filter(teacher =>
      teacher.courses.includes(Number(id))
    );

    res.status(200).json({
      course,
      teachers: filteredTeachers,
      plans,
      trainingPlans,
      otherCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving course details', error });
  }
};


const getCoursesByCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;

    const courses = await Course.findAll({ where: { categoryID } });

    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found for this category' });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving courses by category', error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const courseToUpdate = await Course.findByPk(id);

    if (!courseToUpdate) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (image && courseToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'courses', courseToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = {
      title: title || courseToUpdate.title,
      description: description || courseToUpdate.description,
      image: image || courseToUpdate.image,
      categoryID: categoryID || courseToUpdate.categoryID
    };

    await Course.update(updatedData, { where: { id } });

    const updatedCourse = await Course.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json({ message: 'Course updated successfully', data: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating course', error });
  }
};

const increaseViewCount = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.viewCount += 1;

    await course.save();

    res.status(200).json({
      message: 'View count updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating view count', error });
  }
};

const deleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
  
      const courseToDelete = await Course.findByPk(id);
  
      if (!courseToDelete) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'courses', courseToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Course.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting course', error });
    }
};

module.exports = { createCourse, getAllCourses, getCourseById, getDataForCourseDetail, getCoursesByCategory, updateCourse, increaseViewCount, deleteCourse };