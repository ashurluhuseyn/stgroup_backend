const Course = require('../../models/CourseModel/course');
const TrainingPlan = require('../../models/CourseModel/trainingPlan');

const createTrainingPlan = async (req, res) => {
  try {
    const { title, description, courseID } = req.body;

    const newPlan = await TrainingPlan.create({
      title,
      description,
      courseID,
    });

    res.status(201).json({ message: 'Plan created successfully', data: newPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating plan', error });
  }
};

const getPlans = async (req, res) => {
    try {
      const plans = await TrainingPlan.findAll();
  
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

    const plan = await TrainingPlan.findByPk(id);

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plan', error });
  }
};

const getPlansByCourseId = async (req, res) => {
  try {
    const { id } = req.params;

    const plans = await TrainingPlan.findAll({ where: { courseID: id } });
    res.status(200).json({ plans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plans by course', error });
  }
};


const updateTrainingPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, courseID } = req.body;

    const plan = await TrainingPlan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    await plan.update({
      title: title || plan.title,
      description: description || plan.description,
      courseID: courseID || plan.courseID,
    });

    res.status(200).json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating plan', error });
  }
};

const deleteTrainingPlan = async (req, res) => {
    try {
      const { id } = req.params;
  
      const planToDelete = await TrainingPlan.findByPk(id);
  
      if (!planToDelete) {
        return res.status(404).json({ message: 'Plan not found' });
      }
  
      await TrainingPlan.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting plan', error });
    }
};

module.exports = { createTrainingPlan, getPlansByCourseId, getPlans, getPlanById, updateTrainingPlan, deleteTrainingPlan };