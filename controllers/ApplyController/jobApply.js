const JobApply = require('../../models/ApplyModel/jobApply');
const Vacancy = require('../../models/vacancy');
const multer = require('multer');
const path = require('path');

const applyToVacancy = async (req, res) => {
  const { firstname, lastname, vacancyID } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'CV is required and must be in PDF format.' });
  }

  try {
    const apply = await JobApply.create({
      firstname,
      lastname,
      cv: req.file.filename,
      vacancyID,
    });

    const vacancy = await Vacancy.findByPk(vacancyID);
    if (vacancy) {
      await vacancy.increment('applyCount');
    }

    res.status(201).json(apply);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}


const getAppliesByVacancyId = async (req, res) => {
  const { id } = req.params;
  
  try {
    const applications = await JobApply.findAll({
      where: { vacancyID: id },
      include: [
        {
          model: Vacancy,
          attributes: ['title'],
        },
      ],
    });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this vacancy.' });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {applyToVacancy, getAppliesByVacancyId}