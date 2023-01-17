import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Produtos extends Component {
  render() {
    const { produtos, onClick } = this.props;
    return (
      <div>
        {produtos.map((produto) => (
          <div key={ produto.id }>
            <Link
              to={ `/detalhes/${produto.id}` }
              key={ produto.id }
              data-testid="product-detail-link"
            >
              <div data-testid="product">
                <img src={ produto.thumbnail } alt={ produto.title } />
                <p>{ produto.title }</p>
                <p>{ produto.price }</p>
              </div>
            </Link>
            <button
              type="button"
              data-testid="product-add-to-cart"
              onClick={ () => onClick(produto.id) }
            >
              salvar
            </button>
          </div>
        ))}
      </div>
    );
  }
}
Produtos.propTypes = {
  onClick: PropTypes.func.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};
