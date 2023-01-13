import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categorias extends Component {
  render() {
    const { categories, selectCategories, select } = this.props;
    return (
      <>
        <p>Categorias: </p>
        {categories.map((categorie) => (
          <label key={ categorie.id } htmlFor="nome">
            <input
              key={ categorie.id }
              type="radio"
              onChange={
                () => selectCategories(categorie.id)
              }
              name="nome"
              value={ select }
              data-testid="category"
            />
            {categorie.name}
          </label>
        ))}
      </>
    );
  }
}
export default Categorias;

Categorias.propTypes = {
  categories: PropTypes.arrayOf().isRequired,
  selectCategories: PropTypes.func.isRequired,
  select: PropTypes.bool.isRequired,
};
