import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AgentLists() {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState('');
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/agents', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAgents(res.data));
  }, [token]);

  const handleSelect = async e => {
    const agentId = e.target.value;
    setSelected(agentId);
    if (agentId) {
      const res = await axios.get(`http://localhost:5000/api/lists/agent/${agentId}`, { headers: { Authorization: `Bearer ${token}` } });
      setItems(res.data);
    } else {
      setItems([]);
    }
  };

  return (
    <div className="app-container">
      <h2>Agent Lists</h2>
      <select onChange={handleSelect} value={selected}>
        <option value="">Select Agent</option>
        {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
      </select>
      {selected && (
        <div style={{margin:'18px 0',padding:'16px',background:'#f5f7fa',borderRadius:'8px',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
          <strong>Name:</strong> {agents.find(a => a._id === selected)?.name}<br/>
          <strong>Email:</strong> {agents.find(a => a._id === selected)?.email}<br/>
          <strong>Mobile:</strong> {agents.find(a => a._id === selected)?.mobile}
        </div>
      )}
      <ul>
        {items.map((item, idx) => (
          <li key={idx}><strong>{item.firstName}</strong> <span style={{color:'#6a89cc'}}>- {item.phone}</span> <span style={{color:'#38d39f'}}>- {item.notes}</span></li>
        ))}
      </ul>
    </div>
  );
}
export default AgentLists;
