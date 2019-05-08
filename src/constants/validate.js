export function emailValidate(email){
    var reg_exp = /^(([^<>()\\[\]\\.,:\s@"]+(\.[^<>()\\[\]\\.,:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (reg_exp.test(email)){
        return true
    }
    return false
}

export function codeValidate(code){
    if (code.length >= 2) {
        return true
    }
    return false
}

export function oldPasswordValidate(oldPassword){
    if (oldPassword.length > 5) {
        return true
    }
    return false
}
export function passwordValidate(password){
    if (password.length > 6) {
        return true
    }
    return false
}
export function SignInpasswordValidate(password){
    if (password.length > 5) {
        return true
    }
    return false
}

export function confirmPasswordValidate(confirmPassword, password){
    if (password.length > 6 && password === confirmPassword) {
        return true
    }
    return false
}

export function placeValidate(place){
    if (place && place.length >= 2) {
        return true
    }
    return false
}

export function fullnameValidate(name){
    if (name && name.indexOf(" ") > 0 && name.indexOf(" ") < name.length - 1){
        return true
    }
    return false
}

export function socialValidate(value){
    let social = value.toLowerCase()   
    if (social.indexOf('linkedin.com') !== -1 || social.indexOf('google.com') !== -1 || social.indexOf('behance.com') !== -1 || social.indexOf('facebook.com') !== -1 || social.indexOf('github.com') !== -1) {
        return true
    }
    if(social === ''){
        return true;
    }
    return false
}