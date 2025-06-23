import React, { useEffect, useState } from 'react';

export default function History() {
  const [logs, setLogs] = useState([]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);
  const limit = 10;

  const fetchHistory = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/history?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error('Failed to fetch history');
      const data = await res.json();
      setLogs(data.logs || []);
      setCount(data.count || 0);
      setError(null);
    } catch (err) {
      setLogs([]);
      setCount(0);
      setError('Could not load history');
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, [offset]);

  return (
    <div>
      <h3>Request History</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {(logs || []).map(log => (
          <li key={log.id}>
            <b>{log.method}</b> {log.url} - Status: {log.status} <br/>
            <small>{new Date(log.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setOffset(Math.max(0, offset - limit))} disabled={offset === 0}>Prev</button>
        <button onClick={() => setOffset(offset + limit)} disabled={offset + limit >= count}>Next</button>
      </div>
      <div>Total: {count}</div>
    </div>
  );
} 