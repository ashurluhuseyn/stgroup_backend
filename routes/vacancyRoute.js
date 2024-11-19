const express = require("express");
const router = express.Router();
const { createVacancy, getVacancies, updateVacancy, getVacancyById, deleteVacancy } = require('../controllers/vacancyController')

router.post('/', createVacancy)

router.get('/', getVacancies)

router.get('/:id', getVacancyById)

router.patch('/:id', updateVacancy)

router.delete('/:id', deleteVacancy)

module.exports = router;