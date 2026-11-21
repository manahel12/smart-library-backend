const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const auth = require('../middleware/auth');

router.get('/', auth, resourceController.getAllResources);
router.post('/', auth, resourceController.addResource); 

module.exports = router;