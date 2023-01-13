import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';
import Carrinho from './pages/Carrinho';

function App() {
  return (
    <Switch>
      <Route path="/carrinho" component={ Carrinho } />
      <Route exact path="/" component={ TelaPrincipal } />
    </Switch>
  );
}
export default App;
