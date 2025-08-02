const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const auth = require('../middleware/auth');


router.post('/', auth, agentController.addAgent);
router.get('/', auth, agentController.getAgents);
// Delete agent by ID
router.delete('/:id', auth, agentController.deleteAgent);

module.exports = router;
