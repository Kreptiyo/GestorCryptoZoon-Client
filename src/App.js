import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import { LoginButton } from './components/Login';
import Navigation from './components/Navigation';
import FightsList from './components/FightsList';
import ZoansList from './components/ZoansList';
import CreateFight from './components/CreateFight';
import DailyEarnings from './components/DailyEarnings';
import Stats from './components/Stats';
import FightsTableUI from './components/FightsTableUI';
import CreateZoan from './components/CreateZoan';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <>
            <Router>
              <Navigation />
              <div className="container">
                <Route path="/" exact component={FightsTableUI} />
                <Route path="/createfight/:zoan_id" component={CreateFight} />
                <Route path="/createzoan" component={CreateZoan} />
                <Route path="/zoans" component={ZoansList} />
                <Route path="/zoan/:zoan_id" component={FightsList} />
                <Route path="/dailyearnings" component={DailyEarnings} />
                <Route path="/stats" component={Stats} />
              </div>
            </Router>
          </>
        ) : (
          <div className="container">
            <div className="justify-content-center row">
            <div className="card-myzoan card text-white bg-dark mb-3 border-warning mb-3">
            <img alt="ZoanImg" src='https://coinarbitragebot.com/inc/coin_logos/cryptozoon.png' className="card-img" />
            <h1 style={{alignContent: 'center', textAlign: 'center', marginTop: '10px'}}> Gestor CryptoZoon </h1>
            <LoginButton />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
