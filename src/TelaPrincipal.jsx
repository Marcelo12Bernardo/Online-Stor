import { Component } from 'react';
import Categorias from './Categorias';
import { getCategories } from './services/api';

class TelaPrincipal extends Component {
  state = {
    categoria: [],
  };

  componentDidMount() {
    getCategories()
      .then((response) => this.setState({
        categoria: response,
      }));
  }

  render() {
    const { categoria } = this.state;
    return (
      <div>
        <input type="text" />
        <p data-testid="home-initial-message">
          digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categorias
          categories={ categoria }
          // {/*selectCategories={}*/}
        />
      </div>
    );
  }
}
export default TelaPrincipal;
