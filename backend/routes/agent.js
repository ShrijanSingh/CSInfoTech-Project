const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const auth = require('../middleware/auth');


router.post('/', auth, agentController.addAgent);
router.get('/', auth, agentController.getAgents);
// Update agent by ID
router.put('/:id', auth, agentController.updateAgent);
// Delete agent by ID
router.delete('/:id', auth, agentController.deleteAgent);

module.exports = router;
