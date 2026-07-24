const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const auth = require('../middleware/auth');

router.get('/', journalController.getAllJournals);
router.get('/:id', journalController.getJournalById);
router.post('/', auth, journalController.createJournal);
router.put('/:id', auth, journalController.updateJournal);
router.delete('/:id', auth, journalController.deleteJournal);

module.exports = router;
