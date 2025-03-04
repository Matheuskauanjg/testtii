// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        {/* Outras rotas serão adicionadas aqui */}
      </Switch>
    </Router>
  );
};

export default App;
