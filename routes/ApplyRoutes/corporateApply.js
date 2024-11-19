const express = require('express');
const router = express.Router();
const {createCorporateApply, getAllApplies, updateApplyStatus} = require('../../controllers/ApplyController/corporateApply');

router.post('/', createCorporateApply);

router.get('/', getAllApplies);

router.put('/:id/status', updateApplyStatus);

module.exports = router;