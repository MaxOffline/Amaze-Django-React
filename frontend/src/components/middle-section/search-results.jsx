import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  searchedProducts = () => {
    const { products, searchInput } = this.props;
    let searchedProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchInput)
    );
    if (searchedProducts.length > 0) {
      return (
        <div className="products-list-section" ref="productresult">
          {searchedProducts.map(product => (
            <div key={product._id}>
              <Link
                to={{
                  pathname: "/home/productdetails",
                  state: {
                    product,
                    title: product._id
                  }
                }}
              >
                <img
                  src={product.imgUrl}
                  alt={product.title}
                  className="featured-show"
                />
              </Link>
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
          ))}
        </div>
      );
    } else {
      return <h1>Product-Not-Found</h1>;
    }
  };

  render() {
    return <React.Fragment>{this.searchedProducts()}</React.Fragment>;
  }
}

export default SearchResults;
