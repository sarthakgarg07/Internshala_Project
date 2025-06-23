import React, { useState } from 'react';

export default function RequestForm({ onLog }) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await fetch(url, { method, body: method !== 'GET' ? body : undefined });
      const resBody = await res.text();
      setResponse(resBody);

      // Log to backend
      await fetch('http://localhost:4000/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method, url, requestBody: body, status: res.status, responseBody: resBody,
          requestHeaders: {}, responseHeaders: Object.fromEntries(res.headers.entries())
        })
      });
      onLog && onLog();
    } catch (err) {
      setResponse('Error: ' + err.message);
    }
  };

  return (
    <div>
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
      </select>
      {method !== 'GET' && <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Request Body" />}
      <button onClick={sendRequest}>Send</button>
      {response && <pre>{response}</pre>}
    </div>
  );
} 