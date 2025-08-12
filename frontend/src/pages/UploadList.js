import React, { useState } from 'react';
import axios from 'axios';

function UploadList() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/api/lists/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('List uploaded and distributed');
      setFile(null);
      sessionStorage.setItem('csvUploaded', 'true');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error uploading list');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 32px #b2b6d622', padding: '48px 40px', minWidth: 370, maxWidth: 420, width: '100%' }}>
        <h2 style={{ fontWeight: 800, color: '#2d3e50', textAlign: 'center', marginBottom: 32, fontSize: '2rem', letterSpacing: 1 }}>Upload List</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" className="form-control mb-3" accept=".csv,.xlsx,.xls" onChange={handleFileChange} style={inputStyle} />
          <button type="submit" className="btn w-100" style={buttonStyle}>Upload</button>
        </form>
        {message && (
          <p className={`text-center mt-3 ${message.includes('distributed') ? 'text-success' : 'text-danger'}`}>{message}</p>
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
export default UploadList;
