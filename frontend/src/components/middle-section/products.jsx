import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Footer from "./../bottom-section/footer";

class Products extends Component {
  state = {
    selectedProducts: [],
    selectValues: {},
    updated: false
  };


  componentDidMount() {
    let selectedProducts = [...this.state.selectedProducts];
    selectedProducts = this.props.products.filter(
      product => product.category === this.props.selectedCategory
    );
    this.setState({ selectedProducts });
    if (this.state.updated === false) {
      this.setSelectValues();
      this.setState({ updated: true });
    }
  }

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

  // assign initial values for select menu
  setSelectValues = () => {
    let selectValues = { ...this.state.selectValues };
    this.props.products.forEach(product => {
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

  handleCategoryClick = selectedCategory => {
    let selectedProducts = [...this.state.selectedProducts];
    selectedProducts = this.props.products.filter(
      product => product.category === selectedCategory
    );
    this.props.onCategoryChange(selectedCategory);
    this.setState({ selectedProducts });
  };

  render() {
    return (
      <React.Fragment>
        <div className="products-main">
          <div className="products-category-selection-menu">
            <button
              className="category-link"
              onClick={() => this.handleCategoryClick("coats")}
            >
              Coats
            </button>
            <button
              className="category-link-two"
              onClick={() => this.handleCategoryClick("shoes")}
            >
              Shoes
            </button>
          </div>
          <div className="products-list-section">
            {this.state.selectedProducts.map(product => (
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
                  <span>
                  <select
                  ref={String(product._id)}
                  onChange={event => {
                    this.handleQuantityChange(
                      product._id,
                      event.currentTarget.value
                    );
                  }}
                >
                  {this.returnSelectElements()}
                </select>
              </span>
              <button
                className="add-to-cart-button"
                onClick={() =>
                  this.props.onAddToCart(
                    product,
                    this.state.selectValues[product._id]
                  )
                }
              >
                Add to Cart
                <FontAwesomeIcon
                  className="add-to-cart-icon"
                  icon={faShoppingCart}
                  onClick={() =>
                    this.props.onAddToCart(
                      product,
                      this.state.selectValues[product._id]
                    )
                  }
                />
              </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Products;
