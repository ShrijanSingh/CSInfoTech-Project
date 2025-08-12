import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AgentLists() {
  const [agents, setAgents] = useState([]);
  const [selected, setSelected] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', mobile: '' });
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



  const handleEdit = (id) => {
    const agent = agents.find(a => a._id === id);
    setEditId(id);
    setEditData({ name: agent.name, email: agent.email, mobile: agent.mobile });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditData({ name: '', email: '', mobile: '' });
  };

  const handleEditSubmit = async (id) => {
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:5000/api/agents/${id}`, editData, { headers: { Authorization: `Bearer ${token}` } });
      setAgents(agents.map(a => a._id === id ? res.data : a));
      setEditId(null);
      setEditData({ name: '', email: '', mobile: '' });
    } catch (err) {
      alert('Failed to update agent');
    }
    setLoading(false);
  };

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
            {editId === a._id ? (
              <form onSubmit={e => { e.preventDefault(); handleEditSubmit(a._id); }} style={{display:'flex',alignItems:'center',width:'100%',gap:'8px'}}>
                <input name="name" value={editData.name} onChange={handleEditChange} required style={{width:'100px'}} />
                <input name="email" value={editData.email} onChange={handleEditChange} required style={{width:'160px'}} />
                <input name="mobile" value={editData.mobile} onChange={handleEditChange} required style={{width:'120px'}} />
                <button type="submit" style={{background:'#27ae60',color:'#fff',border:'none',borderRadius:'4px',padding:'4px 10px',cursor:'pointer'}}>Save</button>
                <button type="button" onClick={handleEditCancel} style={{background:'#b2bec3',color:'#2d3436',border:'none',borderRadius:'4px',padding:'4px 10px',cursor:'pointer'}}>Cancel</button>
              </form>
            ) : (
              <>
                <span>
                  <strong>{a.name}</strong> <span style={{color:'#6a89cc'}}>- {a.email}</span> <span style={{color:'#38d39f'}}>- {a.mobile}</span>
                </span>
                <div style={{display:'flex',gap:'8px'}}>
                  <button onClick={() => handleEdit(a._id)} style={{background:'#3498db',color:'#fff',border:'none',borderRadius:'4px',padding:'4px 10px',cursor:'pointer'}}>Edit</button>
                  <button onClick={() => handleDelete(a._id)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:'4px',padding:'4px 10px',cursor:'pointer'}}>Delete</button>
                </div>
              </>
            )}
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
