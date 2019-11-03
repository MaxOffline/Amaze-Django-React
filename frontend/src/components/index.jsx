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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie'
import Ajax from "../services/Ajax";

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

    async componentDidMount() {
        console.log("component mounted")

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
                if(cartProducts)
                    this.setState({cartProducts, loading:false});
            }

        this.mounted = true;

    }

    componentWillUnmount() {
        this.setState({loading:true, userAuthenticated:false})
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
    csrftoken = Cookies.get('csrftoken');

    handleAddToCart = async (product, quantity) => {
        // Add the quantity to the product
        product.quantity = quantity
        quantity = parseInt(quantity)
        const cartProducts = [...this.state.cartProducts];
        const foundProduct = await cartProducts.find(prod => prod.product_id === product.product_id);
        if (this.state.userAuthenticated){
            // let quantityTotal = 0
            // if (foundProduct){
            //     quantityTotal = (foundProduct.quantity + quantity)
            //     if (quantityTotal > 10){
            //         alert("Maximum quantity to purchase is 10 items.")
            //         return;
            //     }else{
            //         const response = await Ajax(/CartProducts/, "POST", JSON.stringify(product))
            //         response.status === 200? window.location.reload(): console.log("something went wrong");
            //     }
            // }else{
                const response = await Ajax(/CartProducts/, "POST", JSON.stringify(product))
                response.status === 200? window.location.reload(): alert("Maximum quantity to purchase is 10 items.");
            // }
        // If user idn't authenticated
        }else{
                if (foundProduct){
                    foundProduct.quantity += quantity
                    localStorage.setItem("cart", JSON.stringify(cartProducts))
                    this.setState({cartProducts:JSON.parse(localStorage.getItem("cart"))})
                }else{
                    cartProducts.push(product)
                    localStorage.setItem("cart", JSON.stringify(cartProducts))
                    this.setState({cartProducts:JSON.parse(localStorage.getItem("cart"))})
                }

        }
    }

    handleQuantityUpdate =async (id, quantity) => {
        quantity = parseInt(quantity)
        let cartProducts = [...this.state.cartProducts];
        let foundProduct = cartProducts.find(prod => prod.product_id === parseInt(id));
        let difference = 0
        // if the current quantity in the state is smaller than the quantity given
        if (this.state.userAuthenticated){
            switch (true){
                case (quantity > foundProduct.quantity) :
                    difference = (quantity - foundProduct.quantity)
                    break;
                case (foundProduct.quantity > quantity):
                    difference  = -(foundProduct.quantity - quantity)
                    break;
                default:
                    break;
            }

            foundProduct.quantity = difference

            const response = await Ajax("/CartProducts/", "POST", JSON.stringify(foundProduct))
            if (response.status === 200){
                window.location.reload();
            }
        }else{
            console.log("User isn't authenticated")
            // foundProduct.quantity = parseInt(quantity);
            // this.setState({ cartProducts });
            // localStorage.setItem("cart", JSON.stringify(cartProducts))

            
        }

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
        // if (!this.state.userAuthenticated && this.mounted) {
            this.setState({ userAuthenticated:true });
            window.location.replace("/")
        // }
    };

    handleUserLogout = async () => {
            // handleLogout();
            const response = await Ajax("/LogoutAPI/", "GET")
            
            if (response.status === 200){
                this.setState({  userAuthenticated:false }) 
                window.location.reload();
            }
            

    }


    menuOnAuthenticationItems = () => {
        if (this.state.userAuthenticated) {
            return <li className="sign-in-lin" onClick = {() => this.handleUserLogout()}>Logout</li>
        }else{
            return (
            <React.Fragment>
                <li className="sign-in-lin" onClick={() => this.handleClick("/home/login")}>Sign In</li>
                <li className="sign-up-lin" onClick={() => this.handleClick("/home/register")}>Sign Up</li>
            </React.Fragment>)
        }
    }




    handleProductRemove = async (productId) => {
        const response = await Ajax(`/RemoveProduct/${productId}/`, "DELETE")
        response.status === 200?window.location.reload():console.log("failed");
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
                            userAuthenticated={this.state.userAuthenticated}
                            onUserLogout={this.handleUserLogout}
                            menuOn = {this.state.menuOn}
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
                                        userAuthenticated={this.state.userAuthenticated}
                                        onUserLogin={this.handleUserLogin} />
                                )}
                            />
                            <Route
                                path="/home/cart"
                                component={props => (
                                    <Cart
                                        onQuantityUpdate={this.handleQuantityUpdate}
                                        onProductRemove = {this.handleProductRemove}
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
                        userAuthenticated={this.state.userAuthenticated}
                        onUserLogout={this.handleUserLogout}
                        menuOn = {this.state.menuOn}
                    />
                    <div className="menu-items">
                        <form className="search-form-menu" onSubmit={this.handleSearchSubmit}>
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
                            {/* Login, logout and sign-up */}
                            {this.menuOnAuthenticationItems()}
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
