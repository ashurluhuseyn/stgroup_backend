const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createDataForHome, getAllDataForHome, updateDataForHome, getDataById } = require('../../controllers/HomeController/homeController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', '..', 'uploads', 'home');
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

router.post('/', upload.single('image'), createDataForHome);
router.get('/', getAllDataForHome);
router.get('/:id', getDataById);
router.patch('/:id', upload.single('image'), updateDataForHome);

module.exports = router;
