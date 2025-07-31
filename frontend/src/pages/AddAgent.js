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
    <div className="app-container">
      <h2>Add Agent</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile (+country code)" value={form.mobile} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Add Agent</button>
      </form>
      {message && <p style={{textAlign:'center',marginTop:'12px',color:message.includes('success')?'#38d39f':'#e74c3c'}}>{message}</p>}
    </div>
  );
}

export default AddAgent;
