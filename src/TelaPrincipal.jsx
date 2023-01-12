import { Component } from 'react';

class TelaPrincipal extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <p data-testid="home-initial-message">
          digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}
export default TelaPrincipal;
