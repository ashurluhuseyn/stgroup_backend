const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require('../../middlewares/auth');
const { createTrainingPlan, getPlansByCourseId, getPlans, deleteTrainingPlan, getPlanById, updateTrainingPlan } = require('../../controllers/CourseController/trainingPlanController')

router.post('/',  authenticate, authorize(['superAdmin', 'admin', 'user']), createTrainingPlan)
router.get('/', getPlans)
router.get('/:id', getPlanById)
router.get('/:id/course', getPlansByCourseId)
router.patch('/:id',  authenticate, authorize(['superAdmin', 'admin', 'user']), updateTrainingPlan)
router.delete('/:id', authenticate, authorize(['superAdmin', 'admin', 'user']), deleteTrainingPlan); 

module.exports = router;