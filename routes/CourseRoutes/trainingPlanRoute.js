const express = require("express");
const router = express.Router();
const { createTrainingPlan, getPlansByCourseId, getPlans, deleteTrainingPlan } = require('../../controllers/CourseController/trainingPlanController')

router.post('/', createTrainingPlan)
router.get('/', getPlans)
router.get('/:id', getPlansByCourseId)
router.delete('/:id', deleteTrainingPlan); 

module.exports = router;