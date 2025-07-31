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
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error uploading list');
    }
  };

  return (
    <div className="app-container">
      <h2>Upload List</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p style={{textAlign:'center',marginTop:'12px',color:message.includes('distributed')?'#38d39f':'#e74c3c'}}>{message}</p>}
    </div>
  );
}
export default UploadList;
