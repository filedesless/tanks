import React from 'react';
import './App.css';
import Clock from './Clock';
import Stash from './Stash';
import TreasuryLog from './TreasuryLog';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Tabs id="main" defaultActiveKey="clock">
                    <Tab id="tab-clock" eventKey="clock" title="Clock">
                        <Clock />
                    </Tab>
                    <Tab id="tab-stash" eventKey="stash" title="Stash">
                        <Stash />
                    </Tab>
                    <Tab id="tab-treasury" eventKey="treasury" title="TreasuryLog">
                        <TreasuryLog />
                    </Tab>
                </Tabs>
            </header>
        </div>
    );
}

export default App;
