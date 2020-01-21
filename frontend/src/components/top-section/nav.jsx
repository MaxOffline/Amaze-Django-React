import React, { Component } from "react";
import Search from "../top-section/search";
import { CONTROLLERS } from "../../services/handlers";

class Nav extends Component {
    redirect = this.props.history.replace;


    // I should be able to replace this in CSS by using the hover // property because phones treat hover as click
    navLinkElementsIndexes = [3,4,5,6]
    handleSearchClick = () => {
        if (!this.props.userAuthenticated){

            this.refs.nav.childNodes[7].childNodes[1].style.display = "inline-block";
            this.refs.nav.childNodes[7].childNodes[1].focus();
            this.refs.nav.childNodes[7].childNodes[2].style.display = "inline-block";
            this.navLinkElementsIndexes.forEach(index => this.refs.nav.childNodes[index].style.display = "none")
            this.refs.nav.childNodes[7].style.width = "30vw";
        }else{
            this.navLinkElementsIndexes = [3,4,5]
            this.refs.nav.childNodes[6].childNodes[1].style.display = "inline-block";
            this.refs.nav.childNodes[6].childNodes[1].focus();
            this.refs.nav.childNodes[6].childNodes[2].style.display = "inline-block";
            this.navLinkElementsIndexes.forEach(index => this.refs.nav.childNodes[index].style.display = "none")
            this.refs.nav.childNodes[6].style.width = "30vw";
        }
    };


    handleSearchBlur = () => {
        if (!this.props.userAuthenticated){
            this.navLinkElementsIndexes.forEach(index => this.refs.nav.childNodes[index].style.display = "")
            this.refs.nav.childNodes[7].style.width = "";
            this.refs.nav.childNodes[7].childNodes[1].style.display = "none";
            this.refs.nav.childNodes[7].childNodes[2].style.display = "none";
        }else{
            this.navLinkElementsIndexes = [3,4,5]
            this.navLinkElementsIndexes.forEach(index => this.refs.nav.childNodes[index].style.display = "")
            this.refs.nav.childNodes[6].style.width = "";
            this.refs.nav.childNodes[6].childNodes[1].style.display = "none";
            this.refs.nav.childNodes[6].childNodes[2].style.display = "none";
        }
        
    }

    cartQuantity = () => {
        const cartProducts = this.props.cartProducts;
        let quantity = 0;
        for (let product of cartProducts) {
            quantity += parseInt(product.quantity);
        }
        return quantity;
    };


    returnBasketElement = () => {
        if (window.innerWidth > 768) {
            return  (
            <p className="cart-count"
                onClick={() => () => CONTROLLERS.handleNavLinkClick("/home/cart")}>{this.cartQuantity()}
            </p> 
            )
        }
        
    }

    render() {
        const { products } = this.props;
        if (!this.props.userAuthenticated){
            return (
                <div id="nav-main">
                    <ul className="nav-main" ref="nav">
                        <li className="menu-bars" onClick={CONTROLLERS.handleMenuClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="33" height="33" fill="#be9b64">
                                <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"/>
                            </svg>
                        </li>
                        <li className="first-li" />
                        <li className="home-link"
                            onClick={() => CONTROLLERS.handleNavLinkClick("/home")}>Amaze</li>
    
                        <li className="products-link"
                            onClick={() => CONTROLLERS.handleNavLinkClick("/home/products")}>Products</li>
    
                        <li className="sign-in-link"
                            onClick={() => CONTROLLERS.handleNavLinkClick("/home/login")}> Sign In</li>
                        <li className="sign-up-link"
                            onClick={() => CONTROLLERS.handleNavLinkClick("/home/register")}>Sign Up</li>
    
                        <li className="contact-us-link"
                            onClick={() => CONTROLLERS.handleNavLinkClick("/home/contact-us")}>Contact Us</li>
    
                        <Search
                            onSearchClick={this.handleSearchClick}
                            onSearchBlur = {this.handleSearchBlur}
                            products={products}
                            replace={this.props.history.replace}
                        />
                        <div ref="cart" className="cart-main">
                        <svg onClick={() => CONTROLLERS.handleNavLinkClick("/home/cart")} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="opencart" class="svg-inline--fa fa-opencart fa-w-20" role="img" viewBox="0 0 640 512" ><path fill="currentColor" d="M423.3 440.7c0 25.3-20.3 45.6-45.6 45.6s-45.8-20.3-45.8-45.6 20.6-45.8 45.8-45.8c25.4 0 45.6 20.5 45.6 45.8zm-253.9-45.8c-25.3 0-45.6 20.6-45.6 45.8s20.3 45.6 45.6 45.6 45.8-20.3 45.8-45.6-20.5-45.8-45.8-45.8zm291.7-270C158.9 124.9 81.9 112.1 0 25.7c34.4 51.7 53.3 148.9 373.1 144.2 333.3-5 130 86.1 70.8 188.9 186.7-166.7 319.4-233.9 17.2-233.9z"></path></svg>
                            {this.returnBasketElement()}
                        </div>
                        <li className="last-li" />
                    </ul>
                </div>
            );
        }else{
            return (
                <div id="nav-main">
                    <ul className="nav-main" ref="nav">
                        <li className="menu-bars" onClick={CONTROLLERS.handleMenuClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="33" height="33" fill="#be9b64">
                                    <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"/>
                            </svg>
                        </li>
                        <li className="first-li" />
                        <li className="home-link"
                            onClick={ () => CONTROLLERS.handleNavLinkClick("/home")}>Amaze</li>
    
                        <li className="products-link"
                            onClick={() => CONTROLLERS.handleNavLinkClick("/home/products")}>Products</li>
    
        
                        <li className="sign-in-link" onClick={CONTROLLERS.handleUserLogout}>Logout</li>

    
                        <li className="contact-us-link"
                            onClick={() => CONTROLLERS.handleNavLinkClick("/home/contact-us")}>Contact Us</li>
    
                        <Search
                            onSearchClick={this.handleSearchClick}
                            onSearchBlur = {this.handleSearchBlur}
                            products={products}
                            replace={this.props.history.replace}
                        />
                        <div ref="cart" className="cart-main">
                        <svg onClick={() => CONTROLLERS.handleNavLinkClick("/home/cart")} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="opencart" class="svg-inline--fa fa-opencart fa-w-20" role="img" viewBox="0 0 640 512" style={{fontSize: "24px;",marginRight:"10px;"}}><path fill="currentColor" d="M423.3 440.7c0 25.3-20.3 45.6-45.6 45.6s-45.8-20.3-45.8-45.6 20.6-45.8 45.8-45.8c25.4 0 45.6 20.5 45.6 45.8zm-253.9-45.8c-25.3 0-45.6 20.6-45.6 45.8s20.3 45.6 45.6 45.6 45.8-20.3 45.8-45.6-20.5-45.8-45.8-45.8zm291.7-270C158.9 124.9 81.9 112.1 0 25.7c34.4 51.7 53.3 148.9 373.1 144.2 333.3-5 130 86.1 70.8 188.9 186.7-166.7 319.4-233.9 17.2-233.9z" style={{fill:"#be9b64;"}}></path></svg>
                            {this.returnBasketElement()}
                        </div>
                        <li className="last-li" />
                    </ul>
                </div>
            );
        }

    }
}

export default Nav;
