import React, { useState } from 'react';
import axios from 'axios';

function AddAgent() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/agents', form, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Agent added successfully');
      setForm({ name: '', email: '', mobile: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding agent');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px #b2b6d622', padding: '48px 40px', minWidth: 370, maxWidth: 420, width: '100%' }}>
        <h2 style={{ fontWeight: 800, color: '#2d3e50', textAlign: 'center', marginBottom: 32, fontSize: '2rem', letterSpacing: 1 }}>Add Agent</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" className="form-control mb-3" placeholder="Name" value={form.name} onChange={handleChange} required style={inputStyle} />
          <input name="email" type="email" className="form-control mb-3" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
          <input name="mobile" className="form-control mb-3" placeholder="Mobile (+country code)" value={form.mobile} onChange={handleChange} required style={inputStyle} />
          <input name="password" type="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={handleChange} required style={inputStyle} />
          <button type="submit" className="btn w-100" style={buttonStyle}>Add Agent</button>
        </form>
        {message && (
          <p className={`text-center mt-3 ${message.includes('success') ? 'text-success' : 'text-danger'}`}>{message}</p>
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
  padding: '12px 0',
  marginTop: 8,
  boxShadow: '0 2px 8px #6a89cc22',
  border: 'none',
  letterSpacing: 1,
};
export default AddAgent;
