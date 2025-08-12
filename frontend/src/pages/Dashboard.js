import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className="app-container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:'4px',padding:'6px 16px',cursor:'pointer'}}>Logout</button>
      </div>
      <nav>
        <Link to="/add-agent">Add Agent</Link>
        <Link to="/upload-list">Upload List</Link>
        <Link to="/agent-lists">Agent Lists</Link>
      </nav>
    </div>
  );
}
export default Dashboard;
