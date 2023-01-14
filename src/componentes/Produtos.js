import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Produtos extends Component {
  render() {
    const { produtos, onClick, testId, quantityId } = this.props;
    return (
      <div>
        {produtos.map((produto) => (
          <div key={ produto.id }>
            {/* <p >
              Produto
            </p> */}
            <p data-testid={ quantityId }>
              0
            </p>
            <img src={ produto.thumbnail } alt={ produto.title } />
            <p data-testid={ testId }>
              { produto.title }
            </p>
            <p>{ produto.price }</p>
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
  quantityId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};
