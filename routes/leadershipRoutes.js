const express = require('express');
const router = express.Router();
const leadershipController = require('../controllers/leadershipController');
const auth = require('../middleware/auth');

router.get('/', leadershipController.getAllLeadership);
router.post('/', auth, leadershipController.createLeadership);
router.put('/:id', auth, leadershipController.updateLeadership);
router.delete('/:id', auth, leadershipController.deleteLeadership);

module.exports = router;
