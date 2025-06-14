const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { authenticateToken } = require('../middleware/auth');

router.post('/join', authenticateToken, formController.joinForm);
router.get('/:formId/response', authenticateToken, formController.getFormResponse);

module.exports = router;
