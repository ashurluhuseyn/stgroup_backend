const express = require("express");
const router = express.Router();
const { getApplyCounts, getCourseViews } = require('../controllers/statController')

router.get('/apply-counts', getApplyCounts)
router.get('/course/views', getCourseViews)

module.exports = router;