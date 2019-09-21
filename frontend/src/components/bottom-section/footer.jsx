import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="footer">
          <p>
            Copyright &#169; <em>Hossam Mohamed</em>. All rights reserved.
          </p>
          <span>
            <Link to="#">Privacy Policy |</Link>

            <Link to="#">Terms of Use |</Link>

            <Link to="#">Contact us </Link>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
