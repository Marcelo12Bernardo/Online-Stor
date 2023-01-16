import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Header from '../componentes/Header';

export default class DetalhesDoProduto extends React.Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
    especificacao: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({
      title: response.title,
      thumbnail: response.thumbnail,
      price: response.price,
      especificacao: response.attributes,
    });
  }

  // addToCart = (name) => {
  //   const { produtos, produtosBuscados } = this.state;
  //   const findProduct = produtos.find((item) => name === item.name);
  //   this.setState((prev) => {
  //     localStorage
  //       .setItem('key', JSON.stringify([...prev.produtosBuscados, findProduct]));
  //     return ({
  //       produtosBuscados: [...prev.produtosBuscados, findProduct],
  //     });
  //   });
  //   console.log(produtosBuscados);
  // };

  addProdutoCarrinho = () => {
    const produtoObj = this.state;
    const carrinhoInicial = JSON.parse(localStorage.getItem('key'));
    if (carrinhoInicial === null) {
      localStorage.setItem('key', JSON.stringify([produtoObj]));
      return;
    }

    localStorage.setItem('key', JSON.stringify([...carrinhoInicial, produtoObj]));
    // const produtoBuscado = carrinhoInicial.find((itens) => itens.name === name);
    // if (produtoBuscado) {
    //   // produtoBuscado.quantidadeCarr += 1;
    //   localStorage.setItem('carrinho', JSON.stringify(carrinhoInicial));
    // } else {
    //   localStorage.setItem('carrinho', JSON.stringify([...carrinhoInicial, produtoObj]));
    // }
    // console.log({ quantidadeCarr });
  };

  render() {
    const { title, thumbnail, price, especificacao } = this.state;
    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="product-detail-name">{ title }</h1>
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt="Imagem do produto"
          />
        </div>
        <div>
          <ul>
            { especificacao.map((item) => (
              <li key={ item.id }>
                <b>
                  { item.title }
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
            onClick={ this.addProdutoCarrinho }
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
