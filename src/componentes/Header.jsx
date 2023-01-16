import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super();
    const { search } = props;
    this.state = {
      search,
      redirect: false,
    };
  }

  onChange = ({ target: { value } }) => {
    const { onChange } = this.props;
    this.setState({ search: value });
    if (onChange) {
      onChange(value);
    }
  };

  onSearch = async (e) => {
    const { onSearch } = this.props;
    e.preventDefault();
    if (onSearch) {
      await onSearch();
    } else {
      this.setState({ redirect: true });
    }
  };

  render() {
    const { search, redirect } = this.state;
    if (redirect) {
      return <Redirect to={ `/pesquisa/${search}` } />;
    }
    return (
      <div>
        <form onSubmit={ this.onSearch }>
          <input
            type="text"
            data-testid="query-input"
            value={ search }
            onChange={ this.onChange }
          />
          <button
            data-testid="query-button"
            type="submit"
          >
            pesquisar
          </button>
        </form>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          cart
        </Link>
      </div>
    );
  }
}
export default Header;

Header.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  search: '',
  onChange: null,
  onSearch: null,
};
