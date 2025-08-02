import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './App.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Clear distributed list items when frontend is closed or refreshed
window.addEventListener('beforeunload', async (event) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Use navigator.sendBeacon for reliability
    const url = 'http://localhost:5000/api/lists/clear';
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      navigator.sendBeacon(url, JSON.stringify({}));
    } catch (err) {
      // fallback: fetch
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
    }
  }
});
