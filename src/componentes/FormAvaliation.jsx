import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormAvaliation extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    this.state = {
      objid: id,
      rating: -1,
      email: '',
      avaliation: [],
      comment: '',
      validate: true,
    };
  }

  componentDidMount() {

  }

  // mudanças de estado d inputs
  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  // validar form e btn
  handleValidationForm = () => {
    const { email, rating, comment } = this.state;
    const checkEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    return (checkEmail && rating > 0 && comment.length > 0);
  };

  // salvar no local storage
  saveComent = (e) => {
    e.preventDefault();
    if (this.handleValidationForm()) {
      this.setState({ validate: true });
      const { objid, email, comment, rating } = this.state;
      const novaAvaliacao = { email, text: comment, rating };
      const avaliacoes = JSON.parse(localStorage.getItem(objid)) || [];
      localStorage.setItem(objid, JSON.stringify([novaAvaliacao, ...avaliacoes]));
    } else {
      this.setState({ validate: false });
    }
  };

  render() {
    const { email, avaliation, comment, validate } = this.state;
    const ratings = ['5', '4', '3', '2', '1'];
    return (
      <div>
        <form onSubmit={ this.saveComent }>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="product-detail-email"
              placeholder=" digite seu email"
              onChange={ this.handleChange }
              name="email"
              value={ email }

            />
          </label>
          {
            ratings.map((numero) => (
              <label htmlFor={ numero } title="text" key={ numero }>
                <input
                  data-testid={ `${numero}-rating` }
                  type="radio"
                  name="rating"
                  value={ numero }
                  onChange={ this.handleChange }
                />
                { numero }
              </label>
            ))
          }

          <textarea
            data-testid="product-detail-evaluation"
            name="comment"
            placeholder="digite seu comentario"
            onChange={ this.handleChange }
            value={ comment }

          />
          <button
            data-testid="submit-review-btn"
            type="submit"

          >
            Enviar
          </button>

        </form>
        <div>
          { !validate && <p data-testid="error-msg"> Campos inválidos</p>}
          {avaliation.map((index) => (
            <div key={ index }>
              <p data-testid="review-card-rating">{index.rating}</p>
              <p data-testid="review-card-email">{index.email}</p>
              <p data-testid="review-card-evaluation">{index.text}</p>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

FormAvaliation.propTypes = {
  id: PropTypes.string.isRequired,
};
