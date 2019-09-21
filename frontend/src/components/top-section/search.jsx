import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  handleSearchSubmit = event => {
    event.preventDefault();
    this.props.onSearchInputSubmit(this.refs.searchinput.value);
    this.props.replace("/home/search");
  };

  handleBlur = () => {
    // * Refactor * This code to be replaced by CSS by implementing new styles to a new class and simply changing the className in JS.
    this.refs.searchinput.setAttribute("style", "display:none");
    this.props.cartRef.setAttribute("style", "display:inline-block");
    this.refs.searchexit.setAttribute("style", "display:none");
    this.props.navRef.setAttribute(
      "style",
      "grid-template-columns: 11% 11% 11% 11% 11% 11% 11% 13%"
    );
  };

  handleSearchClick = () => {
    // * Refactor* This code to be replaced by CSS by implementing new styles to a new class and simply changing the className in JS.
    this.refs.searchinput.setAttribute("style", "display:inline-block");
    this.refs.searchinput.focus();
    this.refs.searchexit.setAttribute("style", "display:inline-block");
    this.props.cartRef.setAttribute("style", "display:none");
    this.props.navRef.setAttribute(
      "style",
      "grid-template-columns: 11% 11% 11% 11% 11% 11% 34%"
    );
  };

  // We will need to render a search form so we can use the onSubmit method
  // to search the datebase then get the results and redirect to a new component and page
  // called SearchResults
  // We will implement that by adding a route in the application and utilize the replace or push
  // methods in the history of the props.
  render() {
    return (
      <React.Fragment>
        <form className="search-form" onSubmit={this.handleSearchSubmit}>
          <FontAwesomeIcon
            className="search-icon"
            icon={faSearch}
            onClick={this.handleSearchClick}
          />
          <input
            className="search-field"
            type="search"
            name="search"
            onBlur={this.handleBlur}
            placeholder="     Search ..."
            ref="searchinput"
            autoFocus
          />
          <div ref="searchexit" className="search-exit-container">
            <FontAwesomeIcon
              className="search-exit"
              icon={faTimes}
              onClick={this.handleBlur}
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Search;
