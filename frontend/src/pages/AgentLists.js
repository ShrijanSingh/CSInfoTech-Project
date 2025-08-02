import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AgentLists() {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csvUploaded, setCsvUploaded] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/agents', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAgents(res.data));
    // Check if CSV was uploaded in this session
    setCsvUploaded(sessionStorage.getItem('csvUploaded') === 'true');
    if (!sessionStorage.getItem('csvUploaded')) {
      setItems([]);
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/agents/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setAgents(agents.filter(a => a._id !== id));
      if (selected === id) {
        setSelected('');
        setItems([]);
      }
    } catch (err) {
      alert('Failed to delete agent');
    }
    setLoading(false);
  };

  const handleSelect = async e => {
    const agentId = e.target.value;
    setSelected(agentId);
    if (agentId && csvUploaded) {
      const res = await axios.get(`http://localhost:5000/api/lists/agent/${agentId}`, { headers: { Authorization: `Bearer ${token}` } });
      setItems(res.data);
    } else {
      setItems([]);
    }
  };

  return (
    <div className="app-container">
      <h2>Agent Lists</h2>
      <select onChange={handleSelect} value={selected} disabled={loading}>
        <option value="">Select Agent</option>
        {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
      </select>
      <ul style={{marginTop:'18px'}}>
        {agents.map(a => (
          <li key={a._id} style={{marginBottom:'8px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f8f9fa',padding:'8px 12px',borderRadius:'6px'}}>
            <span>
              <strong>{a.name}</strong> <span style={{color:'#6a89cc'}}>- {a.email}</span> <span style={{color:'#38d39f'}}>- {a.mobile}</span>
            </span>
            <button onClick={() => handleDelete(a._id)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:'4px',padding:'4px 10px',cursor:'pointer'}}>Delete</button>
          </li>
        ))}
      </ul>
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
