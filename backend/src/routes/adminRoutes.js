const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/auth');

router.post('/forms', authenticateToken, requireRole('admin'), adminController.createForm);
router.get('/forms', authenticateToken, requireRole('admin'), adminController.getForms);

module.exports = router;
