const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const auth = require('../middleware/auth');

router.get('/', auth, memberController.getAllMembers);
router.post('/', auth, memberController.addMember);
router.post('/', auth, memberController.addMember);

module.exports = router;