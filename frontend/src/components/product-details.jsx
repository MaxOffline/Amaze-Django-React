import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class ProductDetails extends Component {


  state = {
    selectValues: 0,
    updated: false
  };


  product = this.props.location.state.product


   //call the setSelectValues then change the updated to true to prevent rerendering to prevent the
  // MaximumDepthExceeded error.
  componentDidMount() {
    console.log(this.product)
    if (!this.state.updated && this.product ) {
      this.setSelectValues();
      this.setState({ updated: true });
    }
  }


  // assign initial values for select menu
  setSelectValues = () => {
    let selectValues = { ...this.state.selectValues };
      selectValues= 1;
    this.setState({ selectValues });
  };



    // Update the quantity of the current product in the state
    handleQuantityChange = (quantity) => {
      let selectValues = { ...this.state.selectValues };
      selectValues = parseInt(quantity);
      this.setState({ selectValues });
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

  render() {
    const product = this.props.location.state.product
    // We can add a "if " statement to check if the product image url is returned or not
    // if not we could just return a loading icon.


    if (this.state.updated){


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
              <select
                    onChange={event => {
                      this.handleQuantityChange(
                        event.currentTarget.value
                      );
                    }}
                  >
                    {this.returnSelectElements()}
                  </select>
              <button
                className="add-to-cart-button"
                onClick={() => this.props.onAddToCart(product, this.state.selectValues)}
              >
                Add to Cart
                  <FontAwesomeIcon
                  className="add-to-cart-icon"
                  icon={faShoppingCart}
                  onClick={() => this.props.onAddToCart(product,this.state.selectValues)}
                />
              </button>
            </div>
          </div>
        </React.Fragment >
      );
      
    }else {
      return <h1>loading....</h1>
    }
 
  }
}

export default ProductDetails;
