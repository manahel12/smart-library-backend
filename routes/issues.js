const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const auth = require('../middleware/auth');

router.post('/issue', auth, issueController.issueBook);
router.post('/return', auth, issueController.returnBook);
router.get('/active', auth, issueController.getActiveIssues);

module.exports = router;