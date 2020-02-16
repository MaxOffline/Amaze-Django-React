import React, { Component } from 'react';
import Ajax from "../../services/Ajax";
import { CONTROLLERS } from '../../services/handlers';


class PasswordReset extends Component {
    state = { 
        email:"",
        resetCode:"",
        password:"",
        confirmPassword:""
    }

    // ***************Refs******************
    emailForm = React.createRef();
    emailNoExist = React.createRef();
    emailAddress = React.createRef();
    codeForm = React.createRef();
    code = React.createRef();
    newPasswordsForm = React.createRef();
    firstPassword = React.createRef();
    secondPassword = React.createRef();
    incorrectCode = React.createRef();
    sendCodeButton = React.createRef();
    confirmCodeButton = React.createRef();
    resetPasswordButton = React.createRef();

    handleEmailFormSubmit = async (event) => {
        event.preventDefault();
        CONTROLLERS.disableButton(this.sendCodeButton);
        const response = await Ajax(/SendEmail/, "POST", JSON.stringify({email:this.emailAddress.current.value}));
        // Send a request to change verfication code in 30 minutes
        Ajax(/SendEmail/, "PUT", JSON.stringify({email:this.emailAddress.current.value}));

        if (response.status === 200){
            this.emailForm.current.style.display = "none";
            this.codeForm.current.style.display = "block";
            this.setState({email:this.emailAddress.current.value})
        }else{
            this.emailNoExist.current.style.display = "block";
        }
    }


    handleCodeConfirm = async (event) => {
        event.preventDefault();
        CONTROLLERS.disableButton(this.confirmCodeButton);
        const response = await Ajax(/ConfirmCode/, "POST", JSON.stringify({email:this.emailAddress.current.value, reset_code:this.code.current.value}));
        if (response.status === 200){
            this.codeForm.current.style.display = "none";
            this.newPasswordsForm.current.style.display = "block";
            this.setState({resetCode:this.code.current.value})
        }else{
            this.incorrectCode.current.style.display = "block";
        }
    }

    handlePasswordReset = async (event) => {
        event.preventDefault();
        CONTROLLERS.disableButton(this.resetPasswordButton);
        const response = await Ajax(/ResetPassword/, "POST", JSON.stringify({
            email:this.state.email, 
            password:this.state.password,
            confirm_password:this.state.confirmPassword,
            reset_code:this.state.resetCode
        }));
        if (response.status === 200){
            this.codeForm.current.style.display = "none";
            this.newPasswordsForm.current.style.display = "block";
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
            <form ref = {this.emailForm} onSubmit = {this.handleEmailFormSubmit}>
                <p>Please provide an e-mail to send you a verification code.</p>
                <p ref={this.emailNoExist} style={{display:"none", color:"#bf0000d6"}}>Email provided does not exist.</p>
                <input ref = {this.emailAddress} placeholder="Email Address" className = "input"/>
                <button  ref = {this.sendCodeButton} className = "sign-up-input"  style = {{display:"block", fontSize:"1.4vw"}}>Send Code.</button>
            </form>
            <form ref = {this.codeForm} onSubmit = {this.handleCodeConfirm} style={{display:"none"}}>
                <p ref={this.incorrectCode} style={{display:"none", color:"#bf0000d6"}}>The code provided does not match.</p>
                <input ref = {this.code} placeholder="Verification code"className = "input"/>
                <button  ref = {this.confirmCodeButton}  className = "sign-up-input"  style = {{display:"block"}}>Confirm code.</button>
            </form>
            <form ref = {this.newPasswordsForm} style={{display:"none"}} onSubmit = {this.handlePasswordReset}>
                <input ref = {this.firstPassword} type = "password" style = {{display:"block"}} placeholder = "Password" onChange = {this.handleChange} name = "password" className = "input"/>
                <input ref = {this.secondPassword} type = "password" style = {{display:"block"}} placeholder = "Confirm password" onChange = {this.handleChange} name = "confirmPassword" className = "input"/>
                <button ref = {this.resetPasswordButton} className = "sign-up-input"  style = {{display:"block"}}>Reset password</button>
            </form>
        </div>);
    }
}

export default PasswordReset;