const express = require("express");
const router = express.Router();
const { createCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require('../controllers/categoryController');
const { authenticate, authorize } = require("../middlewares/auth");

router.post('/', authenticate, authorize(['superAdmin']), createCategory);

router.get('/', getCategories);

router.get('/:id', getCategoryById);

router.patch('/:id', updateCategory);

router.delete('/:id', authenticate, authorize(['superAdmin']), deleteCategory);

module.exports = router;