const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createDataForCorporateHome, getDataForCorporateHome, getDataForCoById, updateDataForCorporateHome } = require('../../controllers/HomeController/corporateHomeController');
const { authenticate, authorize } = require("../../middlewares/auth");

router.post('/', createDataForCorporateHome);
router.get('/', getDataForCorporateHome);
router.get('/:id', getDataForCoById);
router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']), updateDataForCorporateHome);

module.exports = router;
