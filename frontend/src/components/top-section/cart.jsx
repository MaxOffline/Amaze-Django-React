import React, { Component } from "react";
import Footer from "../bottom-section/footer";
import { Link } from "react-router-dom";

class Cart extends Component {
    // Make a select element with options
    returnOptionElements = (quantity, id) => {
        let optionElements = [];
        for (let i = 1; i <= 10; i++) {
            if (i !== 10) {
                let element = <option key={i}>{i}</option>;
                optionElements.push(element);
            } else {
                let element = <option key={i}>{i}</option>;
                optionElements.push(element);
                return (
                    // Default value is equals to selected on one of the elements in regular HTML5 but it's placed in the select element.
                    <select id={id} defaultValue={quantity} onChange={this.handleSelectChange} >
                        {optionElements}
                    </select>
                );
            }
        }
    };

    handleSelectChange = event => {
        const id = event.currentTarget.id;
        const quantity = event.currentTarget.value;
        this.props.onQuantityUpdate(id, quantity);
    };

    returnCartTotal = () => {
        let total = 0;
        const cartProducts = this.props.cartProducts;
        for (let product of cartProducts) {
            total += product.quantity * parseInt(product.price);
        }
        return total;
    };

    render() {
        if (this.props.cartProducts.length > 0) {
            return (
                <React.Fragment>
                    <div className="products-list-section">

                        {this.props.cartProducts.map(product => (
                            <div key={product.product_id}>
                                <Link to={{
                                    pathname: "/home/productdetails", state: { product, title: product.product_id }
                                }}>
                                    <img src={product.imgUrl} alt={product.title} className="featured-show" />
                                </Link>
                                <div className="price-add">
                                    <span>
                                        <em>Price:{product.price}$</em>
                                    </span>
                                    <span>
                                        <em>Quantity: </em>
                                        {this.returnOptionElements(product.quantity, product.product_id)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="total">Subtotal: {this.returnCartTotal()}$</div>

                    </div>
                    <Footer />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="products-list-section">
                        <h1 style={{ height: "100%" }}>Your cart is empty !</h1>
                    </div>
                    <Footer />
                </React.Fragment>
            );
        }
    }
}

export default Cart;
