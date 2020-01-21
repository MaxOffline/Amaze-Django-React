import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CONTROLLERS } from "../../services/handlers";
class Search extends Component {
    handleSearchSubmit = event => {
        event.preventDefault();
        CONTROLLERS.handleMenuClick(this.refs.searchinput.value);
        this.props.replace("/home/search");
    };

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
