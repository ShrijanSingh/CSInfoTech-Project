
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/agents', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAgents(res.data));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: 'linear-gradient(135deg, #e0e7ff 60%, #f8f9fa 100%)',
        boxShadow: '2px 0 16px #b2b6d622',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
        borderTopRightRadius: 32,
        borderBottomRightRadius: 32,
      }}>
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" style={{ width: 56, marginBottom: 24 }} />
        <h3 style={{ fontWeight: 800, color: '#181c3a', marginBottom: 32, fontSize: 22 }}>CSInfoTech</h3>
        <nav style={{ width: '100%' }}>
          <Link to="/dashboard" style={sidebarLinkStyle}><i className="bi bi-grid" style={iconStyle}></i> Dashboard</Link>
          <Link to="/add-agent" style={sidebarLinkStyle}><i className="bi bi-person-plus" style={iconStyle}></i> Add Agent</Link>
          <Link to="/upload-list" style={sidebarLinkStyle}><i className="bi bi-upload" style={iconStyle}></i> Upload List</Link>
          <Link to="/agent-lists" style={sidebarLinkStyle}><i className="bi bi-people" style={iconStyle}></i> Agent Lists</Link>
        </nav>
        <div style={{ flex: 1 }} />
        <button onClick={handleLogout} className="btn btn-outline-danger w-75 mt-4">Logout</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 32px', background: '#f8f9fa' }}>
        {/* Welcome Message */}
        <div style={{
          fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
          fontWeight: 900,
          fontSize: '2.2rem',
          color: '#6a89cc',
          marginBottom: 32,
          letterSpacing: 1,
          textShadow: '0 2px 8px #e0f7fa44',
        }}>
          Welcome <span style={{ color: '#38d39f', fontWeight: 900, fontSize: '2.5rem' }}>Shrijan Singh</span>
        </div>
        {/* Agent List */}
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #b2b6d622', padding: 32 }}>
          <h3 style={{ color: '#181c3a', fontWeight: 700, marginBottom: 24 }}>Agents</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {agents.map(agent => (
                  <tr key={agent._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={tdStyle}>{agent.name}</td>
                    <td style={tdStyle}>{agent.email}</td>
                    <td style={tdStyle}>{agent.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sidebar link style
const sidebarLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  color: '#181c3a',
  fontWeight: 600,
  fontSize: 16,
  padding: '12px 32px',
  borderRadius: 12,
  margin: '8px 0',
  textDecoration: 'none',
  transition: 'background 0.2s, color 0.2s',
};
const iconStyle = { fontSize: 20, marginRight: 10 };

const thStyle = {
  padding: '12px 18px',
  color: '#6a89cc',
  fontWeight: 700,
  fontSize: 16,
  background: '#f8f9fa',
  borderBottom: '2px solid #e0e7ff',
  textAlign: 'left',
};
const tdStyle = {
  padding: '12px 18px',
  color: '#181c3a',
  fontWeight: 500,
  fontSize: 15,
  background: '#fff',
};

export default Dashboard;
