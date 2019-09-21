import React, { Component } from "react";
import Search from "../top-section/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

class Nav extends Component {
  redirect = this.props.history.replace;
  handleLinkClick = url => {
    if (this.props.history.location.pathname !== url) this.redirect(url);
  };

  // I should be able to replace this in CSS by using the hover // property because phones treat hover as click

  handleSearchClick = () => {
    this.refs.cart.setAttribute("style", "display:none");
    this.refs.nav.setAttribute(
      "style",
      "grid-template-columns: 11% 11% 11% 11% 11% 11% 13%"
    );
  };

  cartQuantity = () => {
    const cartProducts = this.props.cartProducts;
    let quantity = 0;
    for (let product of cartProducts) {
      quantity += product.quantity;
    }
    return quantity;
  };

  handleMenuClick = () => {
    this.props.onMenuClick();
  };

  render() {
    const { handleLinkClick, handleMenuClick } = this;
    const { products } = this.props;
    return (
      <div id="nav-main">
        <ul className="nav-main" ref="nav">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-bars"
            onClick={() => handleMenuClick()}
          />
          <li className="first-li" />

          <li
            className="home-link"
            onClick={() => this.props.onLinkClick("/home")}
          >
            Amaze
          </li>

          <li
            className="products-link"
            onClick={() => handleLinkClick("/home/products")}
          >
            Products
          </li>

          <li
            className="sign-in-link"
            onClick={() => handleLinkClick("/home/login")}
          >
            Sign In
          </li>

          <li
            className="sign-up-link"
            onClick={() => handleLinkClick("/home/register")}
          >
            Sign Up
          </li>

          <li
            className="contact-us-link"
            onClick={() => handleLinkClick("/home/contact-us")}
          >
            Contact Us
          </li>

          <Search
            onSearchInputSubmit={this.props.onSearchInputSubmit}
            onSearchClick={this.handleSearchClick}
            cartRef={this.refs.cart}
            navRef={this.refs.nav}
            products={products}
            replace={this.props.history.replace}
          />
          <div ref="cart" className="cart-main">
            <p
              className="cart-count"
              onClick={() => this.props.onLinkClick("/home/cart")}
            >
              Basket({this.cartQuantity()})
            </p>

            <FontAwesomeIcon
              icon={faShoppingCart}
              className="cart-icon"
              onClick={() => this.props.onLinkClick("/home/cart")}
            />
          </div>
          <li className="last-li" />
        </ul>

        {/*We will need to pass the products props so we can search products  */}
      </div>
    );
  }
}

export default Nav;
