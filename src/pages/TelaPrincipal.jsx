import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Produtos from '../componentes/Produtos';
import Categorias from '../componentes/Categorias';

class TelaPrincipal extends Component {
  state = {
    search: '',
    produtos: [],
    categoria: [],
    select: false,
  };

  componentDidMount() {
    getCategories()
      .then((response) => this.setState({
        categoria: response,
      }));
  }

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

  handleCategories = async (categoriesId) => {
    const response = await getProductsFromCategoryAndQuery(categoriesId, '');
    this.setState({
      produtos: response.results,
    });
  };

  render() {
    const { categoria, produtos, search, select } = this.state;
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
        <Categorias
          categories={ categoria }
          selectCategories={ this.handleCategories }
          select={ select }
        />
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
