import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from './services/api';
import Produtos from './componentes/Produtos';

class TelaPrincipal extends Component {
  state = {
    search: '',
    produtos: [],
  };

  handleOnchange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  handleClick = async () => {
    const { search } = this.state;
    const categoriesId = '';
    const response = await getProductsFromCategoryAndQuery(categoriesId, search);
    this.setState({ produtos: response.results });
  };

  render() {
    const { produtos, search } = this.state;
    return (
      <div>
        <form>
          <input
            value={ search }
            type="text"
            data-testid="query-input"
            onChange={ this.handleOnchange }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.handleClick }
          >
            pesquisar
          </button>
        </form>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          cart
        </Link>

        { produtos.length === 0
          ? <span> Nenhum produto foi encontrado </span>
          : <Produtos produtos={ produtos } /> }
      </div>
    );
  }
}

export default TelaPrincipal;
