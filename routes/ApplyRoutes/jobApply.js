const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { applyToVacancy, getAppliesByVacancyId } = require('../../controllers/ApplyController/jobApply');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', '..', 'uploads', 'cvs');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF and Word files are allowed'), false);
    }
    cb(null, true);
  }
});

router.post('/:id', upload.single('cv'), applyToVacancy);

router.get('/:id', getAppliesByVacancyId);

module.exports = router;
