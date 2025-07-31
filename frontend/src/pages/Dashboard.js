import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="app-container">
      <h2>Dashboard</h2>
      <nav>
        <Link to="/add-agent">Add Agent</Link>
        <Link to="/upload-list">Upload List</Link>
        <Link to="/agent-lists">Agent Lists</Link>
      </nav>
    </div>
  );
}
export default Dashboard;
