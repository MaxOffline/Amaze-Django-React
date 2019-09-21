import React, { Component } from "react";
import Footer from "../bottom-section/footer";


class Login extends Component {



  state = {
    username : "",
    password : ""
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch("/LoginAPI/" ,{
      headers: { "Content-Type": "application/json" },
      mode: "same-origin",
      method: 'POST',
      body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password,
      })
    }).then(response => {
            this.refs.username.value = "";
            this.refs.password.value = "";
            this.props.history.replace("/");
            console.log(response)
    })
  }

  // update username and password value to the state
  handleChange = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }


  render() {
    return (
      <React.Fragment>
        <div className="sign-in">
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="input" ref = "username" name = "username" placeholder="    Username" onChange = {this.handleChange} />
            <input type="text" className="input" ref = "password" name = "password" placeholder="    Password" onChange = {this.handleChange}/>
            <button type="submit" className="sign-up-input">
              Login
            </button>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Login;
