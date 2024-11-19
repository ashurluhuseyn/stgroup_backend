const fs = require('fs')
const path = require('path');
const Teacher = require('../models/teacher');
const Category = require('../models/category');

const createTeacher = async (req, res) => {
  try {
    const { fullname, description, categoryID, courseID } = req.body;
    const image = req.file ? req.file.filename : null;

    const newTeacher = await Teacher.create({
      fullname,
      description,
      image, 
      categoryID
    });

    res.status(201).json({ message: 'Teacher created successfully', data: newTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating teacher', error });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (teachers.length === 0) {
      return res.status(404).json({ message: 'No teachers found' });
    }

    res.status(200).json({ teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving teachers', error });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving teacher', error });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, description, categoryID } = req.body;
    const image = req.file ? req.file.filename : null;

    const teacherToUpdate = await Teacher.findByPk(id);

    if (!teacherToUpdate) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    if (image && teacherToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'teachers', teacherToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = {
      fullname: fullname || teacherToUpdate.fullname,
      description: description || teacherToUpdate.description,
      image: image || teacherToUpdate.image,
      categoryID: categoryID || teacherToUpdate.categoryID,
      updateDate: new Date()
    };

    await Teacher.update(updatedData, { where: { id } });

    const updatedTeacher = await Teacher.findOne({
      where: { id },
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    res.status(200).json({ message: 'Teacher updated successfully', data: updatedTeacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating teacher', error });
  }
};

const deleteTeacher = async (req, res) => {
    try {
      const { id } = req.params;
  
      const teacherToDelete = await Teacher.findByPk(id);
  
      if (!teacherToDelete) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'teachers', teacherToDelete.image);
  
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
  
      await Teacher.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting Teacher', error });
    }
};

module.exports = { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher };