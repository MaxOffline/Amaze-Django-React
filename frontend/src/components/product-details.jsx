import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class ProductDetails extends Component {
  render() {
    const product = this.props.location.state.product
    // We can add a "if " statement to check if the product image url is returned or not
    // if not we could just return a loading icon.
    return (
      <React.Fragment>
        <div className="product-details">
          <div>
            <h1>{product.title}</h1>
          </div>
          <div>
            <img
              src={product.imgUrl}
              alt={product.title}
            />
          </div>
          <div className="price-add">
            <span>
              <em>Price:{product.price}$</em>
            </span>
            <button
              className="add-to-cart-button"
              onClick={() => this.props.onAddToCart(product)}
            >
              Add to Cart
                <FontAwesomeIcon
                className="add-to-cart-icon"
                icon={faShoppingCart}
                onClick={() => this.props.onAddToCart(product)}
              />
            </button>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default ProductDetails;
