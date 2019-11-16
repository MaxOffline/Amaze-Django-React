import React, { Component } from "react";
import Footer from "../bottom-section/footer";
import { Link } from "react-router-dom";
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../middle-section/checkout-form';

class Cart extends Component {
    // Make a select element with options
    returnOptionElements = (quantity, id, product) => {
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
                    <select id={id} defaultValue={quantity} onChange={(event) =>this.handleSelectChange(product, event.currentTarget.value)} >
                        {optionElements}
                    </select>
                );
            }
        }
    };

    handleSelectChange = (product, quantity) => {
        product.quantity = parseInt(quantity) 
        this.props.onQuantityUpdate(product);
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
                                        {this.returnOptionElements(product.quantity, product.product_id, product)}
                                    </span>
                                    <button className = "delete_btn" onClick = {() => this.props.onProductRemove(product.product_id)}>Remove</button>
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
                        <h1 style={{ height: "100%", textAlign:"center", width:"100%" }}>Your cart is empty !</h1>
                        <StripeProvider apiKey="pk_live_FpgQMGTteK1NU6HlsuEJpkEG00o76EGZqd">
                            <div className="example">
                            <h1>React Stripe Elements Example</h1>
                            <Elements>
                                <CheckoutForm />
                            </Elements>
                            </div>
                        </StripeProvider>
                        
                    </div>
                    <Footer />
                </React.Fragment>
            );
        }
    }
}

export default Cart;
