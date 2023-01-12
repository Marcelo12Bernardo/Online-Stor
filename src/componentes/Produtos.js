import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Produtos extends Component {
  render() {
    const { produtos } = this.props;
    return (
      <div>
        {produtos.map((produto) => (
          <div key={ produto.id } data-testid="product">
            <img src={ produto.thumbnail } alt={ produto.title } />
            <p>{ produto.title }</p>
            <p>{ produto.price }</p>
          </div>
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
