import { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Header from '../componentes/Header';
import Produtos from '../componentes/Produtos';
import Categorias from '../componentes/Categorias';

class TelaPrincipal extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { search } } } = this.props;
    this.state = {
      search,
      produtos: [],
      produtosBuscados: [],
      categoria: [],
      select: false,
    };
  }

  async componentDidMount() {
    const { search } = this.state;
    if (search) {
      await this.doSearch();
    }

    const categoria = await getCategories();
    this.setState({ categoria });
  }

  onChangeSearch = (value) => {
    this.setState({ search: value });
  };

  doSearch = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery('', search);
    this.setState({ produtos: response.results });
  };

  handleCategories = async (categoriesId) => {
    const response = await getProductsFromCategoryAndQuery(categoriesId, '');
    this.setState({ produtos: response.results });
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
        <Header
          search={ search }
          onChange={ this.onChangeSearch }
          onSearch={ this.doSearch }
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categorias
          categories={ categoria }
          selectCategories={ this.handleCategories }
          select={ select }
        />

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

TelaPrincipal.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      search: PropTypes.string,
    }),
  }),
};

TelaPrincipal.defaultProps = {
  match: null,
};
