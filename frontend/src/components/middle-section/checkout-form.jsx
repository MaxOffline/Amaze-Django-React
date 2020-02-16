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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTimes } from "@fortawesome/free-solid-svg-icons";


class CheckoutForm extends Component {

    state = {complete: false};
    firstName = React.createRef();
    lastName = React.createRef();
    streetAddress = React.createRef();
    city = React.createRef();
    zipCode = React.createRef();
    email = React.createRef();


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
    
        // if (response.ok){response.json().then(data =>console.log(data))}
    } else {
        Object.entries(validation.validationResults).forEach(entry => {
            const key = entry[0];
            const value = entry[1];
            value ? this[key].current.style.border = "1px solid #be9b64": this[key].current.style.border = ".5px solid red";
        })
    }
    }

    render() {
        return (
        <form className="checkout">
            <FontAwesomeIcon
                className="search-exit"
                icon={faTimes}
                onClick={this.props.handleClose}
                style = {{marginLeft:"auto"}}
            />
            <input type="text" className = "StripeElement" placeholder="      First Name:" ref={this.firstName}/>
            <input type="text" className = "StripeElement" placeholder="      Last Name:" ref={this.lastName}/>
            <input type="text" className = "StripeElement" placeholder="      Street Address:" ref={this.streetAddress}/>
            <input type="text" className = "StripeElement" placeholder="      City:" ref={this.city}/>
            <input type="text" className = "StripeElement" placeholder="      Zipcode:" ref={this.zipCode}/>
            <input type="text" className = "StripeElement" placeholder="      Email:" ref={this.email}/>
            <CardNumberElement 
            style={{base: {
                fontSize: '12px',
                backgroundColor:"rgb(18, 11, 18)",
                textAlign:"center",
                marginTop:"5px",
                fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",
                color:"#be9b64"
                }}}/>
            <CardExpiryElement style={{base: {
                fontSize: '12px',
                backgroundColor:"rgb(18, 11, 18)",
                textAlign:"center",
                marginTop:"5px",
                fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",
                color:"#be9b64"
                }}}/>
            <CardCvcElement style={{base: {
                fontSize: '12px',
                backgroundColor:"rgb(18, 11, 18)",
                textAlign:"center",
                marginTop:"5px",
                fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",
                color:"#be9b64"
                }}}/>
            <input 
                type="submit"
                className = "StripeElement"
                onClick={this.submit}
                placeholder="submit"
                style = {{
                    width: "50%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
                />
        </form>
        );
    }
}

export default injectStripe(CheckoutForm);