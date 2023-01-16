import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Produtos from '../componentes/Produtos';
import Categorias from '../componentes/Categorias';

class TelaPrincipal extends Component {
  state = {
    search: '',
    produtos: [],
    produtosBuscados: [],
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

  addToCart = (id) => {
    const { produtos, produtosBuscados } = this.state;
    const findProduct = produtos.find((item) => id === item.id);
    this.setState((prev) => {
      localStorage
        // Mudar para salvar somente o necessario == detalhado
        .setItem('key', JSON.stringify([...prev.produtosBuscados, findProduct]));
      return ({
        produtosBuscados: [...prev.produtosBuscados, findProduct],
      });
    });
    console.log(produtosBuscados);
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
          : (
            <Produtos
              produtos={ produtos }
              onClick={ this.addToCart }
              quantityId="product"
            />) }
      </div>
    );
  }
}

export default TelaPrincipal;
