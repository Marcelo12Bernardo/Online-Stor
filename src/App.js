import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';
import Carrinho from './pages/Carrinho';
import DetalhesDoProduto from './pages/DetalhesDoProduto';

function App() {
  return (
    <Switch>
      <Route path="/carrinho" component={ Carrinho } />
      <Route path="/detalhes/:id" component={ DetalhesDoProduto } />
      <Route path="/pesquisa/:search" component={ TelaPrincipal } />
      <Route exact path="/" component={ TelaPrincipal } />
    </Switch>
  );
}
export default App;
