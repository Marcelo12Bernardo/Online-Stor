import React from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class DetalhesDoProduto extends React.Component {
  state = {
    name: '',
    img: '',
    price: '',
    especificacao: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      name: response.title,
      img: response.thumbnail,
      price: response.price,
      especificacao: response.attributes,
    });
  }

  addToCart = (name) => {
    const { produtos, produtosBuscados } = this.state;
    const findProduct = produtos.find((item) => name === item.name);
    this.setState((prev) => {
      localStorage
        .setItem('key', JSON.stringify([...prev.produtosBuscados, findProduct]));
      return ({
        produtosBuscados: [...prev.produtosBuscados, findProduct],
      });
    });
    console.log(produtosBuscados);
  };

  render() {
    const { name, img, price, especificacao } = this.state;
    return (
      <div>
        {/* Remover aside quando adcionar o header */}
        <aside>
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho
          </button>
        </aside>
        <div>
          <h1 data-testid="product-detail-name">{ name }</h1>
          <img data-testid="product-detail-image" src={ img } alt="Imagem do produto" />
        </div>
        <div>
          <ul>
            { especificacao.map((item) => (
              <li key={ item.id }>
                <b>
                  { item.name }
                  :
                  {' '}
                </b>
                <span>
                  { item.value_name }
                  {' '}
                </span>
              </li>
            ))}
          </ul>
          <p data-testid="product-detail-price">{ price }</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.addToCart }
          >
            Adicione no carrinho
          </button>
        </div>
      </div>
    );
  }
}

DetalhesDoProduto.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,

    }).isRequired,
  }).isRequired,
};
