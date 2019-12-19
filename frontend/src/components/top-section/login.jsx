import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../bottom-section/footer";
import DjangoCSRFToken from "django-react-csrftoken";
import Cookies from 'js-cookie'


class Login extends Component {
    state = {
        username: "",
        password: ""
    };



    csrftoken = Cookies.get('csrftoken');

    handleSubmit = (event) => {
        event.preventDefault();
        fetch("/LoginAPI/", {
            headers: { "Content-Type": "application/json", 'X-CSRFToken': this.csrfToken },
            // headers: { "Content-Type": "application/json" },
            credentials: "include",
            mode: "same-origin",
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(async (response) => {

            await response.json().then(data =>{
                if (data === "allow"){


                    // Set logged in in the index state to true.
                    this.props.onUserLogin();

                    // redirect.
                    this.props.history.replace("/");
                }else{
                    this.refs.validation.style.display = "block"
                }
            } )
        })

    };

    // update username and password value to the state
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <React.Fragment>
                <div  className = "validation-errors" ref="validation" style={{display:"none", backgroundColor:"#120b12"}}>
                    <p>Your login information are incorrect.</p>
                </div>
                <div className="sign-in">
                    <form onSubmit={this.handleSubmit}>
                        <DjangoCSRFToken />
                        <input
                            type="text"
                            className="input"
                            ref="username"
                            name="username"
                            placeholder="    Username"
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            className="input"
                            ref="password"
                            name="password"
                            placeholder="    Password"
                            onChange={this.handleChange}
                        />
                        <button type="submit" className="sign-up-input">Login</button>
                        <div className = "forgot-password-button">
                            <Link to="/home/reset-password">Forgot password?</Link>
                        </div>
                    </form>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default Login;
