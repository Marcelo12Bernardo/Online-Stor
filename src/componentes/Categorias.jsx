import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categorias extends Component {
  render() {
    const { categories, selectCategories } = this.props;
    return (
      <>
        <p>Categorias: </p>
        {categories.map((categorie) => (
          <label key={ categorie.id } htmlFor="as">
            <input
              key={ categorie.id }
              type="radio"
              onChange={
                () => selectCategories(categorie.id)
              }
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
};
