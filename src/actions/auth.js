import * as Types from '../constants/actionType';
import { request, requestApi } from '../services/request';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export function getPasswordResetToken(data) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            return requestApi('api/Account/SendPasswordResetToken', data, 'POST')
                .then(response => {
                    console.log('getPasswordResetToken:done:', response);
                    dispatch({
                        type: Types.SENT_PASSWORD_RESET_TOKEN_SUCCESS
                    });
                    resolve(true);
                })
                .catch(error => {
                    console.error('getPasswordResetToken:fail:', error);
                    dispatch({
                        type: Types.SENT_PASSWORD_RESET_TOKEN_FAILURE,
                        data: getErrorMessage(error)
                    });
                    reject(false);
                })
        })
    }
}

export function setNewPassword(data) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            return requestApi('api/Account/SetNewPassword', data, 'POST')
                .then(response => {
                    console.log('setNewPassword:done:', response);
                    dispatch({
                        type: Types.SET_NEW_PASSWORD_SUCCESS
                    });
                    resolve(true);
                })
                .catch(error => {
                    console.error('setNewPassword:fail:', error);
                    dispatch({
                        type: Types.SET_NEW_PASSWORD_FAILURE,
                        data: getErrorMessage(error)
                    });
                    reject(false);
                })
        })
    }
}

export function getExternalLogins() {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            if (cookies.get('userInfo')!=='') {
                // let data = {
                //     isLoggedIn:true,
                //     hasRegistered:true,
                //     fullName:cookies.get('name')
                // }
                let hasExternalLogins=true
                dispatch({
                    type: Types.GOT_EXTERNAL_LOGINS,
                    data: { hasExternalLogins:true,isLoggedIn:true}
                });
            } else {
                console.log('User hasn\'t registered');
            }



            // var url = 'api/Account/ExternalLogins?returnUrl=' + encodeURIComponent(urls.CLIENT_HOST) + '&generateState=true';
            // console.log('getExternalLogins:url:', url);
            // return requestApi(url, null, 'GET')
            //     .then(
            //         response => {
            //             console.log('getExternalLogins:done:', response);
            //             const externalLogins = response.reduce((prev, item, i, arr) => {
            //                 prev[item.name.toLowerCase()] = {
            //                     url: item.url,
            //                     state: item.state
            //                 };
            //                 return prev;
            //             }, {});
            //             console.log(externalLogins)
            //             const hasExternalLogins = response.length > 0;
            //             dispatch({
            //                 type: Types.GOT_EXTERNAL_LOGINS,
            //                 data: {externalLogins, hasExternalLogins}
            //             });
            //         },
            //         error => {
            //             console.error('getExternalLogins:fail:', error);
            //         }
            //     )
        })
    }
}

export function startExternalLogin(externalLoginUrl) {
    return {
        type: Types.EXTERNAL_LOGIN_START,
        data: externalLoginUrl
    }
}

export function getUserInfo(headers){
    return function(dispatch){
        return new Promise((resolve, reject) => {
            return requestApi('api/Account/UserInfo', null, 'GET', headers)
                .then(
                    response => {
                        const user = response;
                        console.log('user ' + JSON.stringify(user));
                        if (user.hasRegistered) {
                            console.log('User has registered');
                            dispatch({
                                type: Types.LOGIN_SUCCESS,
                                data: headers.Authorization
                            });
                        } else {
                            console.log('User hasn\'t registered');
                        }
                        resolve(user);
                    },
                    error => {
                        // console.log('getUserInfo.error', error);
                        reject(false);
                    }
                )
        })
    }
}

export function registerExternalUser(data, headers){
    return function(dispatch){
        return new Promise((resolve, reject) => {
            return requestApi('api/Account/RegisterExternal', data, 'POST', headers)
                .then(
                    (response) => {
                        console.log('RegisterExternal.done ' + JSON.stringify(response));
                        resolve(true)
                    },
                    (error) => {
                        console.log('RegisterExternal.fail ' + JSON.stringify(error));
                    }
                )
        })
    }
}

export function signInRequest(credentials){
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            credentials.grant_type = 'password';
            return requestApi('Token', credentials, "POST")
                .then(response => {
                    console.log('signInRequest.response: ', response)
                    dispatch({
                        type: Types.LOGIN_SUCCESS,
                        data: 'Bearer ' + response.access_token
                    });
                    resolve(true);
                })
                .catch(error => {
                    console.log('signInRequest.error', error)
                    dispatch({
                        type: Types.LOGIN_FAIL,
                        data: error
                    });
                    reject(error);
                })
        })
    }
}

export function signUpRequest(userInfo){
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            requestApi('UserRegistration', userInfo, "POST")
                .then(
                    response => {
                        console.log(response)
                        if(response.data[0].ret){
                            resolve(true);
                        }
                        // console.log('signUpRequest.done', response)
                        // dispatch({
                        //     type: Types.SIGNUP_SUCCESS,
                        //     data: response
                        // });
                        // resolve(true);
                    },
                    error => {
                        console.log('signUpRequest.catch', error)
                        dispatch({
                            type: Types.SIGNUP_FAIL,
                            data: getErrorMessage(error)
                        });
                        reject(error.responseJSON);
                    }
                )
        })
    }
}

export function sendMessage(step, data){
    return function () {
        return new Promise((resolve, reject) => {
            request(step, data, "POST")
                .then(response => {                    
                    resolve(true);
                })
                .catch(error => {
                    console.log('Error', error)
                    reject(false);
                })
        })
    }
}

export function changeType(signUpType){
    return {
        type: Types.SIGNUP_TYPE,
        signUpType
    };
}

export function getEditState(flag){    
    return {
        type: Types.EDIT_TYPE,
        flag
    };
}

function getErrorMessage(errorResponse) {
    let errorMessage = 'An error has occurred.';
    if (!errorResponse.responseJSON) {
        return errorMessage;
    }
    if (errorResponse.responseJSON.modelState) {
        if (errorResponse.responseJSON.modelState[""]) {
            errorMessage = errorResponse.responseJSON.modelState[""][0];
        } else {
            errorMessage = Object.values(errorResponse.responseJSON.modelState)
                .reduce((prev, item, i, arr) => {
                    return prev.concat(item)
                }, [])
                .join('\n');
        }
    } else if (errorResponse.responseJSON.message) {
        errorMessage = errorResponse.responseJSON.message;
    }
    console.debug('getErrorMessage:', errorMessage);
    return errorMessage;
}