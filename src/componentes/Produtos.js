import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Produtos extends Component {
  render() {
    const { produtos } = this.props;
    return (
      <div>
        {produtos.map((produto) => (
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
        ))}
      </div>
    );
  }
}
Produtos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};
