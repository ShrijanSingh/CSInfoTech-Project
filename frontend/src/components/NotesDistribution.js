import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      .catch(err => {
        setError('Failed to fetch distribution');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Notes Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Notes</th>
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
  );
};

export default NotesDistribution;
