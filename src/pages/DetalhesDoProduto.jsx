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

  render() {
    const { name, img, price, especificacao } = this.state;
    return (
      <div>
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
            data-testid="shopping-cart-button"
            type="button"
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
