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
    <div style={{ minHeight: '100vh', background: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px #b2b6d622', padding: '48px 40px', minWidth: 420, maxWidth: 540, width: '100%' }}>
        <h2 style={{ fontWeight: 800, color: '#2d3e50', textAlign: 'center', marginBottom: 32, fontSize: '2rem', letterSpacing: 1 }}>Agent Lists</h2>
        <select onChange={handleSelect} value={selected} disabled={loading} className="form-select mb-4" style={inputStyle}>
          <option value="">Select Agent</option>
          {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
        </select>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {agents.map(a => (
            <div key={a._id} style={{ background: '#f8faff', borderRadius: 16, padding: '18px 24px', boxShadow: '0 2px 12px #b2b6d611', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {editId === a._id ? (
                <form onSubmit={e => { e.preventDefault(); handleEditSubmit(a._id); }} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <input name="name" value={editData.name} onChange={handleEditChange} required className="form-control" style={{ width: '100px', ...inputStyle }} />
                  <input name="email" value={editData.email} onChange={handleEditChange} required className="form-control" style={{ width: '160px', ...inputStyle }} />
                  <input name="mobile" value={editData.mobile} onChange={handleEditChange} required className="form-control" style={{ width: '120px', ...inputStyle }} />
                  <button type="submit" className="btn btn-success btn-sm" style={buttonStyle}>Save</button>
                  <button type="button" onClick={handleEditCancel} className="btn btn-secondary btn-sm" style={buttonStyle}>Cancel</button>
                </form>
              ) : (
                <>
                  <span style={{ fontWeight: 700, fontSize: 17 }}>{a.name} <span style={{ color: '#6a89cc', fontWeight: 500 }}>- {a.email}</span> <span style={{ color: '#38d39f', fontWeight: 500 }}>- {a.mobile}</span></span>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button onClick={() => handleEdit(a._id)} className="btn btn-info btn-sm" style={buttonStyle}>Edit</button>
                    <button onClick={() => handleDelete(a._id)} className="btn btn-danger btn-sm" style={buttonStyle}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {selected && (
          <div className="mb-3 p-3 bg-light rounded shadow-sm" style={{ marginTop: 24 }}>
            <strong>Name:</strong> {agents.find(a => a._id === selected)?.name}<br />
            <strong>Email:</strong> {agents.find(a => a._id === selected)?.email}<br />
            <strong>Mobile:</strong> {agents.find(a => a._id === selected)?.mobile}
          </div>
        )}
        {items.length > 0 && (
          <ul className="list-group" style={{ marginTop: 24 }}>
            {items.map((item, idx) => (
              <li key={idx} className="list-group-item">
                <strong>{item.firstName}</strong> <span className="text-primary">- {item.phone}</span> <span className="text-success">- {item.notes}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  border: '1.5px solid #e0e7ff',
  borderRadius: 10,
  fontSize: '1rem',
  padding: '14px 16px',
  background: '#f8faff',
  boxShadow: 'none',
};
const buttonStyle = {
  background: 'linear-gradient(90deg, #38d39f 60%, #6a89cc 100%)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  borderRadius: 10,
  padding: '8px 18px',
  boxShadow: '0 2px 8px #6a89cc22',
  border: 'none',
  letterSpacing: 1,
};
export default AgentLists;
