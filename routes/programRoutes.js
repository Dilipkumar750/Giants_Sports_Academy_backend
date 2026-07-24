const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const auth = require('../middleware/auth');

router.get('/', programController.getAllPrograms);
router.post('/', auth, programController.createProgram);
router.put('/:id', auth, programController.updateProgram);
router.delete('/:id', auth, programController.deleteProgram);

module.exports = router;
