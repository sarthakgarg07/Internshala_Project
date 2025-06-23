import React, { useState } from 'react';
import RequestForm from './components/RequestForm';
import History from './components/History';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Minimal REST Client</h2>
      <RequestForm onLog={() => setRefresh(r => !r)} />
      <hr />
      <History key={refresh} />
    </div>
  );
}

export default App;
