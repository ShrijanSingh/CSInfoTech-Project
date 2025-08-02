import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotesDistribution.css';

const NotesDistribution = () => {
  const [distribution, setDistribution] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/list/distribution')
      .then(res => {
        setDistribution(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch distribution');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="center-text">Loading...</div>;
  if (error) return <div className="center-text error">{error}</div>;

  return (
    <div className="distribution-container">
      <h2>🧾 Notes Distribution</h2>
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Note</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(distribution).map(([note, count]) => (
              <tr key={note}>
                <td>{note}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesDistribution;
