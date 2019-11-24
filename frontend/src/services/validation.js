import React from "react";



const passwordValidation = (firstPassword, secondPassword) => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const specialCharacters = "/^!@#$%\^&*)(+=._-]*$/?";
    const hasEnoughLength = (firstPassword.length >= 8);
    const match = (firstPassword === secondPassword);
    let containsUppercase = false;
    let containsNumbers = false;
    let containsSpecials = false;

    // Convert the password to an array then apply validations
    firstPassword.split("").forEach((letter) => {

        // Check uppercase
        if (letter === letter.toUpperCase()) {
            containsUppercase = true;
        }
        // Check numbers
        if (numbers.includes(parseInt(letter))) {
            containsNumbers = true;
        }
        // Check specials
        if (specialCharacters.split("").includes(letter)) {
            containsSpecials = true;
        }
    })
    const allValid = hasEnoughLength && match && containsUppercase && containsNumbers && containsSpecials;
    return [match, hasEnoughLength, containsUppercase, containsNumbers, containsSpecials, allValid]
}



const returnValidationItems = ({
    password,
    confirmPassword,
    passwordContainsUpperCase,
    passwordContainsSpecials,
    passwordHasEnoughLength,
    passwordContainsNumbers,
    passwordsMatch,
    email,
    confirmEmail,
    emailsMatch,
    usernameValid,
    firstName,
    lastName
}) => {
    let passwordMessages = []
    let emailMessages = []
    if (!password || !confirmPassword) {
        passwordMessages = [<p>Password is required.</p>];
    } else {
        if (!passwordContainsUpperCase) {
            passwordMessages.push(<p>Password must contain at least one uppercase character.</p>);
        }
        if (!passwordContainsSpecials) {
            passwordMessages.push(<p>Password must contain at least one special character.</p>);
        }
        if (!passwordHasEnoughLength) {
            passwordMessages.push(<p> Password must be at least 8 characters.</p>);
        }
        if (!passwordContainsNumbers) {
            passwordMessages.push(<p>Password must contain at least one number.</p>);
        }
        if (!passwordsMatch) {
            passwordMessages.push(<p>Passwords don't match.</p>);
        }
    }
    if (!email || !confirmEmail) {
        emailMessages = [<p>Email is required.</p>];
    } else {
        if (!emailsMatch) {
            emailMessages.push(<p>Emails don't match.</p>);
        }
        if (!confirmEmail) {
            emailMessages.push(<p>Confirm Email is required.</p>);
        }
        if (!email) {
            emailMessages.push(<p>Email is required.</p>);
        }
    }

    return <React.Fragment>
        <div className="validation-errors" ref="usernameValidation" style={{ display: "none", backgroundColor: "rgba(6,0,6,.87)" }}>
            {usernameValid ? "" : <p>Username is taken, please try a differenct one.</p>}
        </div>
        <div className="validation-errors" ref="validation" style={{ display: "none", backgroundColor: "rgba(6,0,6,.87)" }}>
            {firstName ? "" : <p>First name is required.</p>}
            {lastName ? "" : <p>Last name is required.</p>}
            {passwordMessages.map(msg => msg)}
            {emailMessages.map(msg => msg)}
        </div>
    </React.Fragment>
}



const paymentFieldValidation = (firstName, lastName, streetAddress, city, zip, email) => {
    const validationResults = {}

    firstName ? validationResults.firstName = true : validationResults.firstName = false;
    lastName ? validationResults.lastName = true : validationResults.lastName = false;
    streetAddress ? validationResults.streetAddress = true : validationResults.streetAddress = false;
    city ? validationResults.city = true : validationResults.city = false;
    /^\d{5}$|^\d{5}-\d{4}$/.test(zip) ? validationResults.zip = true : validationResults.zip = false;
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? validationResults.email = true : validationResults.email = false;
    const allValid = validationResults.firstName &&
                                 validationResults.lastName &&
                                 validationResults.streetAddress &&
                                 validationResults.city &&
                                 validationResults.zipValid &&
                                validationResults.emailValid;

    return { allValid, validationResults }
}

export { passwordValidation, returnValidationItems, paymentFieldValidation };