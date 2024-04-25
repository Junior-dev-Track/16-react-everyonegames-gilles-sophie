import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Footer from './components/Footer';
import Home from './components/Home';
import './styles.scss';


function Routes() {
  return (
    <Router>
      <App />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* Ajoute d'autres routes si nécessaire */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
