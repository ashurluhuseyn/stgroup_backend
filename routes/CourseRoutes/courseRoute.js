const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createCourse, getAllCourses, getCourseById, getDataForCourseDetail,  getCoursesByCategory, updateCourse, increaseViewCount, deleteCourse } = require('../../controllers/CourseController/courseController');
const { authenticate, authorize } = require('../../middlewares/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../../', 'uploads', 'courses');
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
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only images are allowed'), false);
      }
      cb(null, true);
    }
  });

router.post('/', authenticate, authorize(['superAdmin', 'admin']), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'icon', maxCount: 1 }]), createCourse);
router.get('/', getAllCourses);
router.get('/:id/details', getDataForCourseDetail);
router.get('/category/:categoryID', getCoursesByCategory);
router.get('/:id', getCourseById); 
router.patch('/:id', updateCourse); 
router.patch('/:id/view', increaseViewCount);
router.delete('/:id', authenticate, authorize(['superAdmin']), deleteCourse);

module.exports = router;
