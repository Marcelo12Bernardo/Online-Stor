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
          <p data-testid="shopping-cart-product-quantity">
            1
            { quantity }
          </p>
          <img src={ thumbnail } alt={ title } />
          <p data-testid="shopping-cart-product-name">
            { title }
          </p>
          <p>{ price }</p>
        </div>
      ))
    );
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
