const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { auth, roleAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, roleAuth(['admin']), createUser);
router.get('/', auth, roleAuth(['admin']), getUsers);
router.get('/:id', auth, roleAuth(['admin']), getUserById);
router.put('/:id', auth, roleAuth(['admin']), updateUser);
router.delete('/:id', auth, roleAuth(['admin']), deleteUser);

module.exports = router;