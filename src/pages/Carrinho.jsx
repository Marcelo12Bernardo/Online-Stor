import { Component } from 'react';
import Header from '../componentes/Header';

class Carrinho extends Component {
  state = {
    itensCarrinho: [],
  };

  componentDidMount() {
    this.getItemsLocalStorage();
  }

  emptyCard = () => (
    <p data-testid="shopping-cart-empty-message">
      Seu carrinho está vazio
    </p>
  );

  getItemsLocalStorage = () => {
    if (localStorage.getItem('key')) {
      const carrinho = JSON.parse(localStorage.getItem('key'));
      this.setState({
        itensCarrinho: carrinho,
      });
    }
  };

  renderShoppingCart = () => {
    const { itensCarrinho } = this.state;
    return (
      itensCarrinho.map(({ id, quantity, thumbnail, title, price }) => (
        <div key={ id }>
          <img src={ thumbnail } alt={ title } />
          <p data-testid="shopping-cart-product-name">
            { title }
          </p>
          <p>{ price }</p>
          <div key={ id }>
            <button
              data-testid="remove-product"
              id={ id }
              type="button"
              onClick={ () => this.removeItensCart(id) }
            >
              x
            </button>
            <span data-testid="shopping-cart-product-quantity">
              <button
                id={ id }
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ this.decreaseProduct }
              >
                -
              </button>
              { quantity }
              <button
                id={ id }
                data-testid="product-increase-quantity"
                type="button"
                onClick={ this.increaseProduct }
              >
                +
              </button>
            </span>
          </div>
        </div>
      ))
    );
  };

  removeItensCart = (id) => {
    this.setState((prevState) => ({ itensCarrinho: prevState.itensCarrinho
      .filter((produto) => (produto.id !== id)),
    }), () => {
      const { itensCarrinho } = this.state;
      localStorage.setItem('key', JSON.stringify(itensCarrinho));
    });
  };

  increaseProduct = ({ target }) => {
    const { itensCarrinho } = this.state;
    const produto1 = itensCarrinho.find((produto) => produto.id === target.id);
    if (produto1.quantity < produto1.available_quantity) {
      produto1.quantity += 1;
    }
    this.setState({ itensCarrinho: [...itensCarrinho] });
    localStorage.setItem('key', JSON.stringify(itensCarrinho));
  };

  decreaseProduct = ({ target }) => {
    const { itensCarrinho } = this.state;
    const produto1 = itensCarrinho.find((produto) => produto.id === target.id);
    if (produto1.quantity > 1) {
      produto1.quantity -= 1;
    }
    this.setState({ itensCarrinho: [...itensCarrinho] });
    localStorage.setItem('key', JSON.stringify(itensCarrinho));
  };

  render() {
    const { itensCarrinho } = this.state;
    return (
      <div>
        <Header />
        { itensCarrinho.length !== 0
          ? this.renderShoppingCart()
          : this.emptyCard()}
      </div>
    );
  }
}
export default Carrinho;
