const fs = require('fs')
const path = require('path');
const FieldPlan = require('../models/plan');

const createPlan = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newPlan = await FieldPlan.create({
      title,
      description,
      image
    });

    res.status(201).json({ message: 'Plan created successfully', data: newPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating plan', error });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await FieldPlan.findAll();

    if (!plans.length) {
      return res.status(404).json({ message: 'No plans found' });
    }

    res.status(200).json({ plans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plans', error });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await FieldPlan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plan', error });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const planToUpdate = await FieldPlan.findByPk(id);

    if (!planToUpdate) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    if (image && planToUpdate.image) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'plans', planToUpdate.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    planToUpdate.title = title || planToUpdate.title;
    planToUpdate.description = description || planToUpdate.description;
    if (image) {
      planToUpdate.image = image;
    }

    await planToUpdate.save();

    res.status(200).json({ message: 'Plan updated successfully', data: planToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating plan', error });
  }
};


const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const planToDelete = await FieldPlan.findByPk(id);

    if (!planToDelete) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', 'plans', planToDelete.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await FieldPlan.destroy({ where: { id } });

    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting plan', error });
  }
};

module.exports = { createPlan, getAllPlans, getPlanById, updatePlan, deletePlan };