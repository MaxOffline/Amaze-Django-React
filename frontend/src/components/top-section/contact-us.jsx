import React, { Component } from "react";
import Footer from "./../bottom-section/footer";

class ContactUs extends Component {
  handleSubmit = event => {
    event.preventDefault();
    console.log("Magic happens");
  };
  render() {
    return (
      <React.Fragment>
        <div className="contact-us" onSubmit={this.handleSubmit}>
          <form id="contact-us-form">
            <div>
              <input className="input" placeholder="    First name" />
              <input className="input" placeholder="    Last name" />
            </div>
            <div>
              <input className="input" placeholder="    Phone" />
              <input className="input" placeholder="    E-mail" />
            </div>

            <textarea
              className="input"
              placeholder="    Message...."
              form="contact-us-form"
              rows="10"
              cols="45"
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ContactUs;
