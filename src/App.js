import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TelaPrincipal from './TelaPrincipal';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ TelaPrincipal }
      />
    </Switch>
  );
}
export default App;
