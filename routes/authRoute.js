const express = require("express");
const router = express.Router();
const {authenticate, authorize} = require('../middlewares/auth');
const { registerUser, loginUser, getUsers, changeUserRole, deleteUser } = require('../controllers/authController')


router.post('/login', loginUser)
router.post('/register',authenticate, authorize(['superAdmin']), registerUser)
router.get('/', getUsers)
router.patch('/:id', authenticate, authorize(['superAdmin']), changeUserRole);
router.delete('/:id', authenticate, authorize(['superAdmin']), deleteUser);




module.exports = router;
