import React, {Component} from 'react';
import {
    CardElement,
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from 'react-stripe-elements';
import Cookies from 'js-cookie'
import {paymentFieldValidation} from '../../services/validation';


class CheckoutForm extends Component {

    state = {complete: false};
    firstName = React.createRef();
    lastName = React.createRef();
    streetAddress = React.createRef();
    city = React.createRef();
    zipCode = React.createRef();
    email = React.createRef();
    validationFirstName = React.createRef();
    validationLastName = React.createRef();
    validationStreetAddress = React.createRef();
    validationCity = React.createRef();
    validationZipcode = React.createRef();
    validationEmail = React.createRef();



    submit = async (event) => {
        event.preventDefault();
        const validation = paymentFieldValidation(
                                        this.firstName.current.value,
                                        this.lastName.current.value,
                                        this.streetAddress.current.value,
                                        this.city.current.value,
                                        this.zipCode.current.value,
                                        this.email.current.value
                                        )

    if(validation.allValid){
        const csrftoken = Cookies.get('csrftoken');
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("/PaymentProcess/", {
        headers: { "Content-Type": "application/json",'X-CSRFToken':csrftoken, "Accept": "application/json"},
        method: "POST",
        body: JSON.stringify({token:token.id, amount:this.props.total, email:this.email.current.value})
        });
    
        if (response.ok){response.json().then(data =>console.log(data))}
    } else {
        Object.entries(validation.validationResults).forEach(entry => {
            const key = entry[0];
            const value = entry[1];
            switch (true){
                case (key === "firstName"):
                        value? this.validationFirstName.current.style.display = "none" : this.validationFirstName.current.style.display = "block";
                        break;
                case (key === "lastName"):
                        value ? this.validationLastName.current.style.display = "none" : this.validationLastName.current.style.display = "block";
                        break;
                case (key === "streetAddress"):
                        value ? this.validationStreetAddress.current.style.display = "none" : this.validationStreetAddress.current.style.display = "block";
                        break;
                case (key === "city"):
                        value ? this.validationCity.current.style.display = "none" :this.validationCity.current.style.display = "block";
                        break;
                case (key === "zip"):
                        value ? this.validationZipcode.current.style.display = "none" : this.validationZipcode.current.style.display = "block";
                        break;
                case (key === "email"):
                        value ? this.validationEmail.current.style.display = "none" : this.validationEmail.current.style.display = "block";
                        break;
                default:
                    break;
            }
        })
    }
    }

    render() {
        return (
        <form className="checkout">
            <p ref  = {this.validationFirstName} style={{display: "none"}}>First name is required.</p>
            <p ref  = {this.validationLastName} style={{display: "none"}}>Last name is required.</p>
            <p ref  = {this.validationStreetAddress} style={{display: "none"}}>Street address is required.</p>
            <p ref  = {this.validationCity} style={{display: "none"}}>City is required.</p>
            <p ref  = {this.validationZipcode} style={{display: "none"}}>Zipcode is invalid.</p>
            <p ref  = {this.validationEmail} style={{display: "none"}}>Email is invalid.</p>
            <input type="text" placeholder="      First Name:" ref={this.firstName}/>
            <input type="text" placeholder="      Last Name:" ref={this.lastName}/>
            <input type="text" placeholder="      Street Address:" ref={this.streetAddress}/>
            <input type="text" placeholder="      City:" ref={this.city}/>
            <input type="text" placeholder="      Zipcode:" ref={this.zipCode}/>
            <input type="text" placeholder="      Email:" ref={this.email}/>
            <CardNumberElement/>
            <CardExpiryElement/>
            <CardCvcElement/>
            <input type="submit" onClick={this.submit} placeholder="submit"/>
        </form>
        );
    }
}

export default injectStripe(CheckoutForm);