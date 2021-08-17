import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import FightsList from './components/FightsList';
import ZoansList from './components/ZoansList';
import CreateFight from './components/CreateFight';
import CreateZoan from './components/CreateZoan';
import DailyEarnings from './components/DailyEarnings';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container">
          <Route path="/" exact component={FightsList} />
          <Route path="/createfight/:zoan_id" component={CreateFight} />
          <Route path="/createzoan" component={CreateZoan} />
          <Route path="/zoans" component={ZoansList} />
          <Route path="/zoan/:zoan_id" component={FightsList} />
          <Route path="/dailyearnings" component={DailyEarnings} />
        </div>
      </div>
    </Router>
  )
}

export default App;
