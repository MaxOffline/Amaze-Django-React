import React, { Component } from "react";
import Footer from "../bottom-section/footer";
import DjangoCSRFToken from "django-react-csrftoken";
import {passwordValidation, returnValidationItems} from "../../services/validation";
import Ajax from "../../services/Ajax";
class Register extends Component {
    state = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        emailCode: null,
        validation: {
            password : false,
            confirmPassword:false,
            usernameValid : false,
            passwordsMatch: false,
            passwordHasEnoughLength: false, 
            passwordContainsUpperCase: false,
            passwordContainsNumbers: false,
            passwordContainsSpecials: false,
            emailsMatch: false,
            firstName:false,
            lastName:false,
            email:false,
            confirmEmail: false
        }
    };
    // ***************Refs******************
    codeForm = React.createRef();
    code = React.createRef();
    incorrectCode = React.createRef();
    signUp = React.createRef();


    handleSubmit = async (event) => {
        event.preventDefault();
        this.refs.validation.style.display = "none";
        this.refs.usernameValidation.style.display = "none";

        // Will return a an array of booleans that reflects different password validations, refer to validation.js
        const passwordValidationResult = passwordValidation(this.refs.password.value, this.refs.confirm_password.value)
        const emailsMatch = (this.refs.email.value === this.refs.confirm_email.value)

        // If there is anything wrong with the validation, we will show the validation div therefore see the errors.
        if (!(passwordValidationResult[5] && emailsMatch && this.refs.email.value && this.refs.confirm_email.value)){
            this.refs.validation.style.display = "block";
        }
        // If everything is valid, send the request.
        if (passwordValidationResult[5] && emailsMatch && this.refs.first_name.value && this.refs.last_name.value && this.refs.email.value && this.refs.confirm_email.value){
            
            // Send a request to send the validation code to the email.
            const response = await Ajax(/EmailCode/, "POST", JSON.stringify({email:this.state.email}))
            response.json().then(data => this.setState({emailCode: String(data[0])}))
            if (response.status === 200 ){
                this.signUp.current.style.display = "none";
                this.codeForm.current.style.display = "block";
            } else {
                alert("Something has went wrong sending the code.");
            }
            //  We will set the state with all the values to get the validation error messages.
        }else{
            this.setState({validation:{
                password: this.refs.password.value,
                confirmPassword: this.refs.confirm_password.value,
                firstName : this.refs.first_name.value,
                lastName: this.refs.last_name.value,
                email: this.refs.email.value,
                confirmEmail: this.refs.confirm_email.value,
                passwordsMatch:passwordValidationResult[0], 
                passwordHasEnoughLength:passwordValidationResult[1],
                passwordContainsUpperCase:passwordValidationResult[2],
                passwordContainsNumbers:passwordValidationResult[3],
                passwordContainsSpecials:passwordValidationResult[4],
                emailsMatch,
            }})
        }

    };


    handleCodeFormSubmit = async (event) => {
        event.preventDefault();

        // if the confirmation code matches then we will sign the user up
        if (this.code.current.value === this.state.emailCode){
            const response = await Ajax(/SignupAPI/,"POST", JSON.stringify({
                username: this.state.username,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            }))
                
            if (response.status === 200) {
                // Hide the validation errors and then
                this.refs.usernameValidation.style.display = "none";
                this.refs.validation.style.display = "none";
                // Log user in
                this.props.onUserLogin();
                alert(`Thank you for signing up ${this.state.first_name}`)
                this.props.history.replace("/");
            } else {
                        this.refs.usernameValidation.style.display = "block";
                        }
        } else {
            this.incorrectCode.current.style.display = "block";
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <React.Fragment>
                {returnValidationItems(this.state.validation)}
                <div ref = {this.signUp} className="sign-up">
                    <form onSubmit={this.handleSubmit}>
                        <DjangoCSRFToken />
                        <div className="first-last-input">
                            <input
                                type="text"
                                placeholder="   First name"
                                ref="first_name"
                                name="first_name"
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                placeholder="    Last name"
                                ref="last_name"
                                name="last_name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <select className="country-select" defaultValue="United States">
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antartica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo">Congo, the Democratic Republic of the</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                            <option value="Croatia">Croatia (Hrvatska)</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="France Metropolitan">France, Metropolitan</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                            <option value="Holy See">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran (Islamic Republic of)</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                            <option value="Korea">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia, Federated States of</option>
                            <option value="Moldova">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint LUCIA">Saint LUCIA</option>
                            <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia (Slovak Republic)</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                            <option value="Span">Spain</option>
                            <option value="SriLanka">Sri Lanka</option>
                            <option value="St. Helena">St. Helena</option>
                            <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan, Province of China</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Viet Nam</option>
                            <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                            <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                            <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Yugoslavia">Yugoslavia</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        <input
                            type="text"
                            placeholder="    Username"
                            ref="username"
                            className="input"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            placeholder="    Password"
                            className="input"
                            ref="password"
                            name="password"
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            placeholder="    Confirm password"
                            className="input"
                            ref="confirm_password"
                            name="confirm_password"
                            onChange={this.handleChange}
                        />

                        <input
                            type="text"
                            placeholder="    E-mail"
                            className="input"
                            ref="email"
                            name="email"
                            onChange={this.handleChange}
                        />

                        <input
                            type="text"
                            placeholder="    Confirm e-mail"
                            name="confirm_email"
                            ref="confirm_email"
                            className="input"
                        />

                        <button type="submit" className="sign-up-input">Sign Up</button>
                    </form>
                </div>
                <div>
                <div className="password-reset">
                    <form ref = {this.codeForm} onSubmit = {this.handleCodeFormSubmit} style={{display:"none"}}>
                        <p ref={this.incorrectCode} style={{display:"none", color:"#bf0000d6"}}>The code provided does not match.</p>
                        <input ref = {this.code} placeholder="Verification code" className = "input" />
                        <button  className = "sign-up-input"  style = {{display:"block"}}>Confirm code.</button>
                    </form>
                    </div>
                </div>

                <Footer />
            </React.Fragment>
        );
    }
}

export default Register;
