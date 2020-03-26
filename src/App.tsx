import React from 'react';
import './App.css';
import Clock from './Clock';
import Stash from './Stash';
import TreasuryLog from './TreasuryLog';

function App() {
  return (
      <div className="App">
          <header className="App-header">
              <Clock />
              <Stash />
              <TreasuryLog />
          </header>
      </div>
  );
}

export default App;
