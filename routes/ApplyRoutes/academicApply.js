const express = require('express');
const router = express.Router();
const {createAcademicApply, getAllApplies, updateApplyStatus} = require('../../controllers/ApplyController/academicApply');

router.post('/', createAcademicApply);

router.get('/', getAllApplies);

router.put('/:id/status', updateApplyStatus);

module.exports = router;