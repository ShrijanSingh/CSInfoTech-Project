// Clear all distributed list items
exports.clearListItems = async (req, res) => {
  try {
    await ListItem.deleteMany({});
    res.json({ message: 'All distributed list items cleared.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const Agent = require('../models/Agent');
const ListItem = require('../models/ListItem');
const { parse } = require('csv-parse/sync');
const XLSX = require('xlsx');
const fs = require('fs');

function parseCSV(buffer) {
  // buffer to string
  const csvString = buffer.toString();
  return parse(csvString, { columns: true, trim: true });
}

exports.uploadList = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });
    let items = [];
    if (file.mimetype === 'text/csv') {
      items = await parseCSV(file.buffer);
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      items = XLSX.utils.sheet_to_json(sheet);
    } else {
      return res.status(400).json({ message: 'Invalid file type' });
    }
    // Validate format
    if (!items.every(i => i.FirstName && i.Phone && i.Notes)) {
      return res.status(400).json({ message: 'Invalid file format' });
    }
    let agents = await Agent.find();
    if (agents.length < 1) return res.status(400).json({ message: 'No agents found' });
    // Use only the first 5 agents for distribution
    agents = agents.slice(0, 5);
    let distributed = Array.from({ length: agents.length }, () => []);
    items.forEach((item, idx) => {
      distributed[idx % agents.length].push(item);
    });
    // Save to DB, prevent duplicates
    for (let i = 0; i < agents.length; i++) {
      for (let item of distributed[i]) {
        const exists = await ListItem.findOne({
          firstName: item.FirstName,
          phone: item.Phone,
          notes: item.Notes,
          agent: agents[i]._id
        });
        if (!exists) {
          await ListItem.create({
            firstName: item.FirstName,
            phone: item.Phone,
            notes: item.Notes,
            agent: agents[i]._id
          });
        }
      }
    }
    // Calculate distribution summary for Notes field
    const notesDistribution = {};
    items.forEach(item => {
      const note = item.Notes;
      notesDistribution[note] = (notesDistribution[note] || 0) + 1;
    });
    res.json({ message: 'List uploaded and distributed', notesDistribution });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAgentList = async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const items = await ListItem.find({ agent: agentId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// New endpoint: Get overall Notes distribution from DB
exports.getNotesDistribution = async (req, res) => {
  try {
    const items = await ListItem.find();
    const notesDistribution = {};
    items.forEach(item => {
      const note = item.notes;
      notesDistribution[note] = (notesDistribution[note] || 0) + 1;
    });
    res.json(notesDistribution);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
