import React, { Component } from 'react';
import Ajax from "../../services/Ajax";


class PasswordReset extends Component {
    state = { 
        email:"",
        resetCode:"",
        password:"",
        confirmPassword:""
    }

    handleEmailFormSubmit = async (event) => {
        event.preventDefault();
        const response = await Ajax(/SendEmail/, "POST", JSON.stringify({email:this.refs.emailAddress.value}));
        if (response.status === 200){
            this.refs.emailForm.style.display = "none";
            this.refs.codeForm.style.display = "block";
            this.setState({email:this.refs.emailAddress.value})
        }else{
            response.json().then(data =>  alert(data))
        }
    }

    handleCodeFormSubmit = async (event) => {
        event.preventDefault();
        const response = await Ajax(/ConfirmCode/, "POST", JSON.stringify({email:this.refs.emailAddress.value, reset_code:this.refs.code.value}));
        if (response.status === 200){
            this.refs.codeForm.style.display = "none";
            this.refs.newPasswordsForm.style.display = "block";
            this.setState({resetCode:this.refs.code.value})
        }else{
            response.json().then(data =>  alert(data))
        }
    }

    handlePasswordReset = async (event) => {
        event.preventDefault();
        console.log(this.state.email, this.state.password, this.state.confirmPassword, this.state.resetCode)
        const response = await Ajax(/ResetPassword/, "POST", JSON.stringify({
            email:this.state.email, 
            password:this.state.password,
            confirm_password:this.state.confirmPassword,
            reset_code:this.state.resetCode
        }));
        if (response.status === 200){
            this.refs.codeForm.style.display = "none";
            this.refs.newPasswordsForm.style.display = "block";
        }else{
            response.json().then(data =>  alert(data))
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() { 
        return ( <div className="password-reset">
            <form ref = "emailForm" onSubmit = {this.handleEmailFormSubmit}>
                <input ref ="emailAddress" placeholder="Email Address" className = "input"/>
                <button  className = "sign-up-input" style = {{display:"block", fontSize:"1.4vw"}}>Send Verification Code.</button>
            </form>
            <form ref = "codeForm" onSubmit = {this.handleCodeFormSubmit} style={{display:"none"}}>
                <input ref = "code" placeholder="Verification code"className = "input"/>
                <button  className = "sign-up-input"  style = {{display:"block"}}>Confirm code.</button>
            </form>
            <form ref = "newPasswordsForm" style={{display:"none"}} onSubmit = {this.handlePasswordReset}>
                <input ref = "firstPassword" placeholder = "Password" onChange = {this.handleChange} name = "password" className = "input"/>
                <input ref = "secondPassword" placeholder = "Confirm password" onChange = {this.handleChange} name = "confirmPassword" className = "input"/>
                <button className = "sign-up-input"  style = {{display:"block"}}>Reset password</button>
            </form>
        </div>);
    }
}

export default PasswordReset;