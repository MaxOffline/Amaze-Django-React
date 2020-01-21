import React, { Component } from "react";
import Nav from "./top-section/nav";
import { Route, Switch, Redirect } from "react-router-dom";
import Featured from "./middle-section/featured";
import Register from "./top-section/register";
import Login from "./top-section/login";
import Cart from "./top-section/cart";
import Footer from "./bottom-section/footer";
import ContactUs from "./top-section/contact-us";
import NewArrivals from "./middle-section/new-arrivals";
import Products from "./middle-section/products";
import ProductDetails from "./product-details";
import SearchResults from "./middle-section/search-results";
import Ajax from "../services/Ajax";
import PasswordReset from "./middle-section/password-reset";
import {CONTROLLERS} from "../services/handlers";
export const handler = {
    indexThis(){return this},
}

class Index extends Component {
    state = {
        featuredProducts: [],
        cartProducts: [],
        newArrivals: [],
        products: [],
        userAuthenticated: false,
        searchInput: false,
        menuOn: false,
        loading: true,
        selectedCategory: "coats",
    };

    mounted = false;
    redirect = this.props.history.replace;
    
    componentDidMount() {

        this.fetchAllProducts();
        this.mounted = true;

        window.returnTheThis = function() {
            return this
        }.bind(this)

        handler.indexThis = handler.indexThis.bind(this)
    }

    componentWillUnmount() {
        this.setState({loading:true, userAuthenticated:false})
        this.mounted = false;
    }

    fetchAllProducts = async () => {
        const response =  await Ajax(/DBProductsAPI/, "GET")
        const data = await response.json();

        if (response.status === 200 && data){
            const  products =  JSON.parse(data[0]).map(product => product.fields)
            this.setState({ products, loading: false, userAuthenticated:data[1] });
        }

        if (this.state.userAuthenticated){
            const response = await  Ajax(/CartProducts/, "GET")
            let cartProducts = await response.json();
            
            if (response.status === 200 && cartProducts){
                cartProducts = JSON.parse(cartProducts).map(product => product.fields)
                this.setState({ cartProducts, loading:false  });
            }
            // Else, get it from localStorage
            }else{
                const cartProducts = JSON.parse(localStorage.getItem("cart"));
                if(cartProducts) {
                    this.setState({cartProducts, loading:false});
                }
            }

    }

    updateCartFromDB = async () => {
        const response = await  Ajax(/CartProducts/, "GET")
        let cartProducts = await response.json();

        if (response.status === 200 && cartProducts){
            cartProducts = JSON.parse(cartProducts).map(product => product.fields)
            this.setState({ cartProducts, loading:false  });
        }

    }

    menuOnAuthenticationItems = () => {
        if (this.state.userAuthenticated) {
            return <li className="sign-in-lin" onClick = {CONTROLLERS.handleUserLogout}>Logout</li>
        }else{
            return (
            <React.Fragment>
                <li className="sign-in-lin" onClick={() => CONTROLLERS.handleNavLinkClick("/home/login")}>Sign In</li>
                <li className="sign-up-lin" onClick={() => CONTROLLERS.handleNavLinkClick("/home/register")}>Sign Up</li>
            </React.Fragment>)
        }
    }

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
                    />
                    <Footer />
                </React.Fragment>
            );
        }
    };



    render() {
        const { history } = this.props;
        const { products, cartProducts, searchInput, selectedCategory, userAuthenticated } = this.state;
        if (!this.state.menuOn) {
            return (
                <React.Fragment>
                    <div className="index-main" ref="main">
                        <Nav
                            history={history}
                            products={products}
                            cartProducts={cartProducts}
                            userAuthenticated={this.state.userAuthenticated}
                            menuOn = {this.state.menuOn}
                        />
                        {this.homePageComponents()}
                        <Switch>
                            <Route path="/home/register" component={props => (
                                <Register {...props}  onUserLogin={CONTROLLERS.handleUserLogin} />)} 
                            />
                            <Route
                                path="/home/login"
                                component={props => (
                                    <Login {...props}
                                        userAuthenticated={this.state.userAuthenticated}
                                        onUserLogin={CONTROLLERS.handleUserLogin} />
                                )}
                            />
                            <Route
                                path="/home/reset-password"
                                component={props => (
                                    <PasswordReset {...props}/>
                                )}
                            />
                            <Route
                                path="/home/cart"
                                component={props => (
                                    <Cart
                                        onQuantityUpdate={CONTROLLERS.handleQuantityUpdate}
                                        onProductRemove = {CONTROLLERS.handleProductRemove}
                                        cartProducts={cartProducts}
                                        {...props}
                                        userAuthenticated = {userAuthenticated}
                                    />
                                )}
                            />
                            <Route
                                path="/home/search"
                                component={props => (
                                    <SearchResults
                                        products={products}
                                        searchInput={searchInput}
                                        onAddToCart={CONTROLLERS.handleAddToCart}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path="/home/products"
                                component={props => (
                                    <Products
                                        products={products}
                                        onAddToCart={CONTROLLERS.handleAddToCart}
                                        selectedCategory={selectedCategory}
                                        onCategoryChange={CONTROLLERS.handleCategoryChange}
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
                                        onAddToCart={CONTROLLERS.handleAddToCart}
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
                        history={history}
                        products={products}
                        cartProducts={cartProducts}
                        userAuthenticated={this.state.userAuthenticated}
                        menuOn = {this.state.menuOn}
                    />
                    <div className="menu-items">
                        <form className="search-form-menu" onSubmit={CONTROLLERS.handleSearchSubmit}>
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
                            <li className="products-lin" onClick={() => CONTROLLERS.handleNavLinkClick("/home/products")}>Products</li>
                            {/* Login, logout and sign-up */}
                            {this.menuOnAuthenticationItems()}
                            <li className="contact-us-lin" onClick={() => CONTROLLERS.handleNavLinkClick("/home/contact-us")}>Contact Us</li>
                        </ul>

                    </div>
                    <Switch>
                        <Route
                            path="/home/search"
                            component={props => (
                                <SearchResults
                                    products={products}
                                    searchInput={searchInput}
                                    onAddToCart={CONTROLLERS.handleAddToCart}
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
