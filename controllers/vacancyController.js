const fs = require('fs')
const path = require('path');
const Vacancy = require('../models/vacancy');
const Category = require('../models/category');

const createVacancy = async (req, res) => {
  try {
    const { title, deadline, jobType, requirements, duties, conditions, categoryID } = req.body;

    if (!title || !deadline || !jobType || !categoryID) {
      return res.status(400).json({ error: 'Title, deadline, jobType and categoryID are required.' });
    }

    const newVacancy = await Vacancy.create({
      title,
      deadline,
      jobType,
      requirements,
      duties,
      conditions,
      categoryID,
    });

    return res.status(201).json(newVacancy);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the vacancy.' });
  }
};

const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!vacancies.length) {
      return res.status(404).json({ message: 'No vacancies found' });
    }

    res.status(200).json({vacancies});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving vacancies', error });
  }
};

const getVacancyById = async (req, res) => {
  try {
    const { id } = req.params;

    const vacancy = await Vacancy.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['title'],
      },
    });

    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    await vacancy.increment('viewCount', { by: 1 });

    res.status(200).json(vacancy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving vacancy', error });
  }
};


const updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, deadline, jobType, requirements, duties, conditions, categoryID } = req.body;

    const vacancy = await Vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }

    await vacancy.update({
      title: title || vacancy.title,
      deadline: deadline || vacancy.deadline,
      jobType: jobType || vacancy.jobType,
      requirements: requirements || vacancy.requirements,
      duties: duties || vacancy.duties,
      conditions: conditions || vacancy.conditions,
      categoryID: categoryID || vacancy.categoryID,
    });

    res.status(200).json({ message: 'Vacancy updated successfully', vacancy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating vacancy', error });
  }
};

const deleteVacancy = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedRows = await Vacancy.destroy({
      where: { id }
    });
    
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};


module.exports = { createVacancy, getVacancies, getVacancyById, updateVacancy, deleteVacancy };