// Update agent by ID
exports.updateAgent = async (req, res) => {
  try {
    const agentId = req.params.id;
    const { name, email, mobile } = req.body;
    // Only update name, email, mobile (not password)
    const updated = await Agent.findByIdAndUpdate(
      agentId,
      { name, email, mobile },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Agent not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Delete agent by ID
exports.deleteAgent = async (req, res) => {
  try {
    const agentId = req.params.id;
    const deleted = await Agent.findByIdAndDelete(agentId);
    if (!deleted) return res.status(404).json({ message: 'Agent not found' });
    res.json({ message: 'Agent deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Agent already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();
    res.json({ message: 'Agent added', agent });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
