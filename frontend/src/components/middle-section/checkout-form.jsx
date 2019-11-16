import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import Cookies from 'js-cookie'


class CheckoutForm extends Component {
    constructor(props) {
        super(props)
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
}

    async submit(ev) {
        const csrftoken = Cookies.get('csrftoken');

        let {token} = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("/PaymentProcess/", {
        headers: { "Content-Type": "application/json",'X-CSRFToken':csrftoken, "Accept": "application/json"},
        method: "POST",
        body: JSON.stringify({token:token.id})
        });
    
        if (response.ok){response.json().then(data =>console.log(data))}
    }

    render() {
        return (
        <div className="checkout">
            <p>Would you like to complete the purchase?</p>
            <CardElement />
            <button onClick={this.submit}>Purchase</button>
        </div>
        );
    }
}

export default injectStripe(CheckoutForm);