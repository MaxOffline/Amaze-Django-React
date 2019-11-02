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
        // this.refs.nav.setAttribute(
        //     "style",
        //     "grid-template-columns: 11% 11% 11% 11% 11% 11% 13%"
        // );
    };

    cartQuantity = () => {
        const cartProducts = this.props.cartProducts;
        let quantity = 0;
        for (let product of cartProducts) {
            quantity += parseInt(product.quantity);
        }
        return quantity;
    };

    handleMenuClick = () => {
        this.props.onMenuClick();
    };

    handleLogout = () => {
        this.props.onUserLogout();
        this.props.history.replace("/products")
    };

    returnBasketElement = () => {
        if (window.innerWidth > 768) {
            return  (
            <p className="cart-count"
                onClick={() => this.props.onLinkClick("/home/cart")}>Basket({this.cartQuantity()})
            </p> 
            )
        }
        
    }



    render() {
        const { handleLinkClick, handleMenuClick } = this;
        const { products } = this.props;
        if (!this.props.userAuthenticated){
            return (
                <div id="nav-main">
                    <ul className="nav-main" ref="nav">
                        <li className="menu-bars" onClick={() => handleMenuClick()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="33" height="33" fill="#be9b64">
                                <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"/>
                            </svg>
                        </li>
                        <li className="first-li" />
                        <li className="home-link"
                            onClick={() => this.props.onLinkClick("/home")}>Amaze</li>
    
                        <li className="products-link"
                            onClick={() => handleLinkClick("/home/products")}>Products</li>
    
                            <li className="sign-in-link"
                            onClick={() => this.handleLinkClick("/home/login")}> Sign In</li>
                        <li className="sign-up-link"
                            onClick={() => this.handleLinkClick("/home/register")}>Sign Up</li>
    
                        <li className="contact-us-link"
                            onClick={() => handleLinkClick("/home/contact-us")}>Contact Us</li>
    
                        <Search
                            onSearchInputSubmit={this.props.onSearchInputSubmit}
                            onSearchClick={this.handleSearchClick}
                            cartRef={this.refs.cart}
                            navRef={this.refs.nav}
                            products={products}
                            replace={this.props.history.replace}
                        />
                        <div ref="cart" className="cart-main">
                            {this.returnBasketElement()}
    
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="cart-icon"
                                onClick={() => this.props.onLinkClick("/home/cart")}
                            />
                        </div>
                        <li className="last-li" />
                    </ul>
                </div>
            );
        }else{
            return (
                <div id="nav-main">
                    <ul className="nav-main" ref="nav">
                        <li className="menu-bars" onClick={() => handleMenuClick()}>
                            <FontAwesomeIcon icon={faBars} />
                        </li>
                        <li className="first-li" />
                        <li className="home-link"
                            onClick={() => this.props.onLinkClick("/home")}>Amaze</li>
    
                        <li className="products-link"
                            onClick={() => handleLinkClick("/home/products")}>Products</li>
    
                        <li className="sign-in-link" onClick={() => this.handleLogout()}>Logout</li>

    
                        <li className="contact-us-link"
                            onClick={() => handleLinkClick("/home/contact-us")}>Contact Us</li>
    
                        <Search
                            onSearchInputSubmit={this.props.onSearchInputSubmit}
                            onSearchClick={this.handleSearchClick}
                            cartRef={this.refs.cart}
                            navRef={this.refs.nav}
                            products={products}
                            replace={this.props.history.replace}
                        />
                        <div ref="cart" className="cart-main">
                            <p className="cart-count"
                                onClick={() => this.props.onLinkClick("/home/cart")}>Basket({this.cartQuantity()})
                            </p>
    
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="cart-icon"
                                onClick={() => this.props.onLinkClick("/home/cart")}
                            />
                        </div>
                        <li className="last-li" />
                    </ul>
                </div>
            );
        }

    }
}

export default Nav;
