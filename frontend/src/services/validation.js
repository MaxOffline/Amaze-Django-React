import React from "react";



const passwordValidation = (firstPassword, secondPassword) => {
    const numbers =   [0,1,2,3,4,5,6,7,8,9];
    const specialCharacters = "/^!@#$%\^&*)(+=._-]*$/?";
    const hasEnoughLength = (firstPassword.length >= 8);
    const match = (firstPassword === secondPassword);
    let containsUppercase = false;
    let containsNumbers = false;
    let containsSpecials = false;
    
    // Convert the password to an array then apply validations
    firstPassword.split("").forEach((letter) => {
        
        // Check uppercase
        if (letter === letter.toUpperCase()){
            containsUppercase = true;
        }
        // Check numbers
        if (numbers.includes(parseInt(letter))){
            containsNumbers = true;
        }
        // Check specials
        if (specialCharacters.split("").includes(letter)){
            containsSpecials = true;
        }
    })
    const allValid = hasEnoughLength && match && containsUppercase && containsNumbers && containsSpecials;
    return [match, hasEnoughLength, containsUppercase, containsNumbers, containsSpecials, allValid]
}



const returnValidationItems = state => {
    let passwordMessages = []
    let emailMessages = []
    if (!state.validation.password || !state.validation.confirmPassword){
    passwordMessages =[<p>Password is required.</p>];
    }else{
        if (!state.validation.passwordContainsUpperCase){
            passwordMessages.push(<p>Password must contain at least one uppercase character.</p>);
        }
        if (!state.validation.passwordContainsSpecials){
            passwordMessages.push(<p>Password must contain at least one special character.</p>);
        }
        if (!state.validation.passwordHasEnoughLength){
            passwordMessages.push(<p> Password must be at least 8 characters.</p>);
        }
        if (!state.validation.passwordContainsNumbers){
            passwordMessages.push(<p>Password must contain at least one number.</p>);
        }
        if (!state.validation.passwordsMatch){
            passwordMessages.push(<p>Passwords don't match.</p>);
        }
    }
    if (!state.validation.email || !state.validation.confirmEmail){
    emailMessages = [<p>Email is required.</p>];
    }else{
        if (!state.validation.emailsMatch){
            emailMessages.push(<p>Emails don't match.</p>);
        }
        if (!state.validation.confirmEmail){
            emailMessages.push(<p>Confirm Email is required.</p>);
        }
        if (!state.validation.email){
            emailMessages.push(<p>Email is required.</p>);
        }
    }

    return<React.Fragment>
                    <div className = "validation-errors" ref="usernameValidation"  style={{display:"none", backgroundColor:"rgba(6,0,6,.87)"}}>
                        {state.validation.usernameValid?"":<p>Username is taken, please try a differenct one.</p>}
                    </div>
                    <div  className = "validation-errors" ref="validation" style={{display:"none", backgroundColor:"rgba(6,0,6,.87)"}}>
                            {state.validation.firstName?"":<p>First name is required.</p>}
                            {state.validation.lastName?"":<p>Last name is required.</p>}
                            {passwordMessages.map(msg => msg)}
                            {emailMessages.map(msg => msg)}
                    </div>
                </React.Fragment>
}



export  {passwordValidation,returnValidationItems};