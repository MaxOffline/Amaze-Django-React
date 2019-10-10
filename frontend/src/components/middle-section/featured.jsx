import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// All Images needs to be replaced with a loading icon incase images aren't loaded from the server yet
class Featured extends Component {
    // selectValues is for the initial values of the select menus
    // updated is for used to prevent the component from rerendering by changing it to true in componenetDidUpdate after
    // it sets the state once.

    state = {
        selectValues: {},
        updated: false
    };

    // Create 10 options for the product quantity
    returnSelectElements() {
        const index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const options = index.map(num => (
            <option value={num} key={num}>
                {num}
            </option>
        ));
        return options;
    }

    // We are using this to force the Component to update so we could get initial values for our select element.
    // The reason we didn't need to do that in <Products/> is because it's being passed in a switch as a route and 
    // the default behavior for that is it will make the componenet remound and reupdate
    componentDidMount() {
        if (!this.state.updated && this.props.featuredProducts.length > 0) {
            this.setSelectValues();
            this.setState({ updated: true });
        }
    }


    //call the setSelectValues then change the updated to true to prevent rerendering to prevent the
    // MaximumDepthExceeded error.
    componentDidUpdate() {
        if (!this.state.updated && this.props.featuredProducts.length > 0) {
            this.setSelectValues();
            this.setState({ updated: true });
        }
    }

    // assign initial values for select menu
    setSelectValues = () => {
        let selectValues = { ...this.state.selectValues };
        this.props.featuredProducts.forEach(product => {
            selectValues[product._id] = 1;
        });
        this.setState({ selectValues });
    };

    // Update the quantity of the current product in the state
    handleQuantityChange = (id, quantity) => {
        let selectValues = { ...this.state.selectValues };
        selectValues[id] = parseInt(quantity);
        this.setState({ selectValues });
    };

    render() {

        return (
            <div className="featured-products">
                {this.props.featuredProducts.map(product => (
                    <div key={product._id}>
                        <Link to={{ pathname: "/home/productdetails", state: { product, title: product._id } }}>
                            <img src={product.imgUrl} lt={product.title} className="featured-show" />
                        </Link>
                        <div className="price-add">
                            <span>
                                <em>Price:{product.price}$</em>
                            </span>
                            <span>
                                <select onChange={event => { this.handleQuantityChange(product._id, event.currentTarget.value) }}>
                                    {this.returnSelectElements()}
                                </select>
                            </span>
                            <button
                                className="add-to-cart-button"
                                onClick={() => { this.props.onAddToCart(product, this.state.selectValues[product._id]) }}>Add to Cart
                                <FontAwesomeIcon className="add-to-cart-icon" icon={faShoppingCart}
                                    onClick={() => this.props.onAddToCart(product, this.state.selectValues[product._id])} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Featured;
