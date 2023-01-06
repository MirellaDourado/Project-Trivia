import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Configs from './pages/Configs';
import Feedback from './pages/Feedback';
import Rankinng from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/configs" component={ Configs } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Rankinng } />
    </Switch>
  );
}
