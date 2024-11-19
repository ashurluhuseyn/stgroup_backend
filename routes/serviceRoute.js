const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createService, getAllServices, getServiceById, getServicesByCategory, updateService, deleteService, getServiceDetails } = require('../controllers/serviceController');
const { authenticate, authorize } = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads', 'services');
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
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only images are allowed'), false);
      }
      cb(null, true);
    }
  });

router.post('/', authenticate, authorize(['superAdmin', 'admin']), upload.single('image'), createService);
router.get('/', getAllServices);
router.get('/category/:categoryID', getServicesByCategory);
router.get('/:id', getServiceById);
router.get('/:id/details', getServiceDetails);
router.patch('/:id', authenticate, authorize(['superAdmin', 'admin']), updateService); 
router.delete('/:id', authenticate, authorize(['superAdmin']), deleteService);

module.exports = router;