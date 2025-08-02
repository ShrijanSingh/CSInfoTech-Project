const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


router.post('/upload', auth, upload.single('file'), listController.uploadList);
router.get('/agent/:agentId', auth, listController.getAgentList);
// New route for notes distribution
router.get('/distribution', auth, listController.getNotesDistribution);

// Route to clear all distributed list items
router.delete('/clear', auth, listController.clearListItems);

module.exports = router;
