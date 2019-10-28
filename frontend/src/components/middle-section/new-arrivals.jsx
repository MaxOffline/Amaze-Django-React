import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleRight,
    faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// All Images needs to be replaced with a loading icon incase images aren't loaded from the server yet

class NewArrivals extends Component {
    counter = 0;

    componentDidMount() {
        if (!this.props.loading) {
        if (this.refs.newarrivals.childNodes.length > 0 ){
            this.refs.newarrivals.childNodes[0].childNodes[0].className = "show"
        }
    }
}

    componentDidUpdate() {
        if (!this.props.loading) {
        const length = this.refs.newarrivals.childNodes.length;
        for (let index = 1; index < length; index++) {
            this.refs.newarrivals.childNodes[index].firstChild.className = "hide";
        }
        this.refs.newarrivals.childNodes[this.counter].firstChild.className = "show";
        }
    }

    getSlideImages = () => {
        let newArrivals = this.props.products.filter(
            product => product.newarrival === true
        );
        const imgs = newArrivals.map(product => (
            <Link to={{ pathname: "/home/productdetails", state: { product, title: product.product_id } }}
                key={product.product_id}
                id={product.product_id}>
                <img src={product.imgUrl} alt={product.title} className="hide" />
            </Link>
        ));
        return imgs;
    };

    handleNextClick = () => {
        const length = this.refs.newarrivals.childNodes.length;
        if (this.counter < length - 1) this.counter++;
        else this.counter = 0;
        for (let index = 0; index < length; index++) {
            this.refs.newarrivals.childNodes[index].firstChild.className = "hide";
        }
        this.refs.newarrivals.childNodes[this.counter].firstChild.className = "show";
    };

    handlePrevClick = () => {
        const length = this.refs.newarrivals.childNodes.length;
        if (this.counter === 0) this.counter = length - 1;
        else this.counter--;
        for (let index = 0; index < length; index++) {
            this.refs.newarrivals.childNodes[index].firstChild.className = "hide";
        }
        this.refs.newarrivals.childNodes[this.counter].firstChild.className = "show";
    };

    render() {
        if (this.props.loading) {
            return <h1>Loading....</h1>;
        } else {
            return (
                <React.Fragment>
                    <div className="new-arrivals-container">
                        <FontAwesomeIcon
                            className="prev-arrow"
                            icon={faArrowAltCircleLeft}
                            onClick={() => this.handlePrevClick()}
                        />
                        <div className="newarrivals-images-div" ref="newarrivals">
                            {this.getSlideImages()}
                        </div>
                        <FontAwesomeIcon
                            className="next-arrow"
                            icon={faArrowAltCircleRight}
                            onClick={() => this.handleNextClick()}
                        />
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default NewArrivals;
