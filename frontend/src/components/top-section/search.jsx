import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
    handleSearchSubmit = event => {
        event.preventDefault();
        this.props.onSearchInputSubmit(this.refs.searchinput.value);
        this.props.replace("/home/search");
    };

    handleSearchClick = () => {
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
                        onClick={() => this.props.onSearchClick()}
                    />
                    <input
                        className="search-field"
                        type="search"
                        name="search"
                        onBlur={() =>this.props.onSearchBlur()}
                        placeholder="     Search ..."
                        ref="searchinput"
                        autoFocus
                    />
                    <div ref="searchexit" className="search-exit-container">
                        <FontAwesomeIcon
                            className="search-exit"
                            icon={faTimes}
                            onClick={() =>this.props.onSearchBlur()}
                        />
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default Search;
