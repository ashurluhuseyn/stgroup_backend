const Course = require('../../models/CourseModel/course');
const TrainingPlan = require('../../models/CourseModel/trainingPlan');

const createTrainingPlan = async (req, res) => {
  try {
    const { month, description, courseID } = req.body;

    const newPlan = await TrainingPlan.create({
      month,
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

const getPlansByCourseId = async (req, res) => {
  try {
    const { id } = req.params;

    const plans = await TrainingPlan.findAll({ where: { courseID: id } });

    if (!plans.length) {
      return res.status(404).json({ message: 'No plans found for this course' });
    }

    res.status(200).json({ plans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving plans by course', error });
  }
};

const deleteTrainingPlan = async (req, res) => {
    try {
      const { id } = req.params;
  
      const planToDelete = await TrainingPlan.findByPk(id);
  
      if (!planToDelete) {
        return res.status(404).json({ message: 'Plan not found' });
      }
  
      await Course.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting plan', error });
    }
};

module.exports = { createTrainingPlan, getPlansByCourseId, getPlans, deleteTrainingPlan };