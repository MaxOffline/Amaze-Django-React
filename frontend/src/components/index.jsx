import React, { Component } from "react";
import Nav from "./top-section/nav";
import { Route, Switch, Redirect } from "react-router-dom";
import Featured from "./middle-section/featured";
import DB from "../fakeDB/products";
import Register from "./top-section/register";
import Login from "./top-section/login";
import Cart from "./top-section/cart";
import Footer from "./bottom-section/footer";
import ContactUs from "./top-section/contact-us";
import NewArrivals from "./middle-section/new-arrivals";
import Products from "./middle-section/products";
import ProductDetails from "./product-details";
import SearchResults from "./middle-section/search-results";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Index extends Component {
    state = {
        products: [],
        featuredProducts: [],
        newArrivals: [],
        cartProducts: [],
        loading: false,
        searchInput: false,
        selectedCategory: "coats",
        menuOn: false,
        userLoggedIn: false
    };

    mounted = false;

    componentDidMount() {
        // This is supposed to be a HTTP request using Axios or XMLHtppRequest
        // Once the request is back and we check for any NetWork errors or User Errors
        // And handle them set state.

        
        this.mounted = true;
        new Promise(function (resolve, reject) {
            resolve(DB.products)
        })
            .then(products => {
                if (this.mounted) this.setState({ products, loading: false });
            });
    }
    componentDidUpdate(){
        console.log(this.state.userLoggedIn)
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    redirect = this.props.history.replace;

    handleClick = url => {
        if (window.innerWidth <= 768) {
            this.redirect(url);
            this.setState({ menuOn: false });
        } else this.redirect(url);
    };

    //To be replaced by refs or a CSS class
    handleSelectClick = () => {
        const navContainer = document.getElementById("nav-main");
        if (navContainer.style.display === "grid")
            navContainer.style.display = "none";
        else navContainer.style.display = "grid";
    };

    handleAddToCart = (product, quantity) => {
        const cartProducts = [...this.state.cartProducts];
        if (cartProducts.includes(product)) {
            let foundProduct = cartProducts.find(prod => prod._id === product._id);
            foundProduct.quantity += parseInt(quantity);
            this.setState({ cartProducts });
        } else {
            product.quantity = parseInt(quantity);
            cartProducts.push(product);
            this.setState({ cartProducts });
        }
    };

    handleQuantityUpdate = (id, quantity) => {
        let cartProducts = [...this.state.cartProducts];
        let foundProduct = cartProducts.find(prod => prod._id === parseInt(id));
        foundProduct.quantity = parseInt(quantity);
        this.setState({ cartProducts });
    };

    handleSearchInput = searchInput => {
        this.setState({ searchInput });
    };

    handleCategoryChange = selectedCategory => {
        this.setState({ selectedCategory });
    };
    homePageComponents = () => {
        const featuredProducts = this.state.products.filter(
            product => product.featured === true
        );
        if (this.props.history.location.pathname === "/home") {
            return (
                <React.Fragment>
                    <NewArrivals
                        loading={this.state.loading}
                        products={this.state.products}
                        onProductClick={this.handleProductClick}
                    />
                    <Featured
                        featuredProducts={featuredProducts}
                        onAddToCart={this.handleAddToCart}
                    />
                    <Footer />
                </React.Fragment>
            );
        }
    };
    ;
    handleMenuClick = () => {
        if (!this.state.menuOn) {
            this.setState({ menuOn: true });
            this.props.history.replace("/home");
        } else {
            this.setState({ menuOn: false });
        }
    };

    handleSearchSubmit = event => {
        event.preventDefault();
        this.handleSearchInput(this.refs.searchinput.value);
        this.handleMenuClick();
        this.props.history.replace("/home/search");
    };

    handleUserLogin = () => {
        if (!this.state.userLoggedIn && this.mounted) this.setState({ userLoggedIn: true });
    };

    handleUserLogout = () => {
        if (localStorage.getItem("logged")) { 
            localStorage.removeItem("logged")
            handleLogout();
            this.props.history.replace("/")
            this.setState({ userLoggedIn: false })
        }
    }
    }

    render() {
        const { history } = this.props;
        const { products, cartProducts, searchInput, selectedCategory } = this.state;
        if (!this.state.menuOn) {
            return (
                <React.Fragment>
                    <div className="index-main" ref="main">
                        <Nav
                            onSearchInputSubmit={this.handleSearchInput}
                            history={history}
                            products={products}
                            cartProducts={cartProducts}
                            onMenuClick={this.handleMenuClick}
                            onLinkClick={this.handleClick}
                            userLoggedIn={this.state.userLoggedIn}
                            onUserLogout={this.handleUserLogout}
                        />
                        {this.homePageComponents()}
                        <Switch>
                            <Route path="/home/register" component={props => (
                                <Register {...props}  onUserLogin={this.handleUserLogin} />)} 
                            />
                            <Route
                                path="/home/login"
                                component={props => (
                                    <Login {...props}
                                        userLoggedIn={this.state.userLoggedIn}
                                        onUserLogin={this.handleUserLogin} />
                                )}
                            />
                            <Route
                                path="/home/cart"
                                component={props => (
                                    <Cart
                                        onQuantityUpdate={this.handleQuantityUpdate}
                                        cartProducts={cartProducts}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path="/home/search"
                                component={props => (
                                    <SearchResults
                                        products={products}
                                        searchInput={searchInput}
                                        onAddToCart={this.handleAddToCart}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path="/home/products"
                                component={props => (
                                    <Products
                                        products={products}
                                        onAddToCart={this.handleAddToCart}
                                        selectedCategory={selectedCategory}
                                        onCategoryChange={this.handleCategoryChange}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path="/home/contact-us"
                                component={props => <ContactUs {...props} />}
                            />
                            <Route
                                path="/home/productdetails"
                                component={props => (
                                    <ProductDetails
                                        {...props}
                                        onAddToCart={this.handleAddToCart}
                                    />
                                )}
                            />
                            <Redirect from="/home/*" to="/" />
                        </Switch>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Nav
                        onSearchInputSubmit={this.handleSearchInput}
                        history={history}
                        products={products}
                        cartProducts={cartProducts}
                        onMenuClick={this.handleMenuClick}
                        onLinkClick={this.handleClick}
                        userLoggedIn={this.state.userLoggedIn}
                        onUserLogout={this.handleUserLogout}
                    />
                    <div className="menu-items">
                        <form className="search-form-menu" onSubmit={this.handleSearchSubmit}>
                            <FontAwesomeIcon className="search-icon-menu" icon={faSearch} onClick={this.handleSearchClick} />
                            <input
                                className="search-field-menu"
                                type="search"
                                name="search"
                                onBlur={this.handleBlur}
                                placeholder="     Search ..."
                                ref="searchinput"
                                autoFocus
                            />
                        </form>

                        <ul className="nav-main-menu" ref="nav">
                            <li className="products-lin" onClick={() => this.handleClick("/home/products")}>Products</li>
                            <li className="sign-in-lin" onClick={() => this.handleClick("/home/login")}>Sign In</li>
                            <li className="sign-up-lin" onClick={() => this.handleClick("/home/register")}>Sign Up</li>
                            <li className="contact-us-lin" onClick={() => this.handleClick("/home/contact-us")}>Contact Us</li>
                        </ul>

                    </div>
                    <Switch>
                        <Route
                            path="/home/search"
                            component={props => (
                                <SearchResults
                                    products={products}
                                    searchInput={searchInput}
                                    onAddToCart={this.handleAddToCart}
                                    {...props}
                                />
                            )}
                        />
                    </Switch>
                </React.Fragment>
            );
        }
    }
}

export default Index;
