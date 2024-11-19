const express = require("express");
const router = express.Router();
const { createAdvantage, getAdvantages, getAdvantageById, updateAdvantage, deleteAdvantage } = require('../controllers/advantageController')

router.post('/', createAdvantage)
router.get('/', getAdvantages)
router.get('/:id', getAdvantageById)
router.patch('/:id', updateAdvantage); 
router.delete('/:id', deleteAdvantage)

module.exports = router;