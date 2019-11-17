import React, {Component} from 'react';
import {
    CardElement,
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from 'react-stripe-elements';
import Cookies from 'js-cookie'


class CheckoutForm extends Component {

        state = {complete: false};

    submit = async (ev) => {
        const csrftoken = Cookies.get('csrftoken');
        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("/PaymentProcess/", {
        headers: { "Content-Type": "application/json",'X-CSRFToken':csrftoken, "Accept": "application/json"},
        method: "POST",
        body: JSON.stringify({token:token.id, amount:this.props.total})
        });
    
        if (response.ok){response.json().then(data =>console.log(data))}
    }

    render() {
        return (
        <div className="checkout">
            <p>Enter your card details</p>
            <CardNumberElement />
            <CardExpiryElement/>
            <CardCvcElement/>
            <button onClick={this.submit}>Place Order</button>
        </div>
        );
    }
}

export default injectStripe(CheckoutForm);