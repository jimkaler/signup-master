import * as Types from '../constants/actionType'

const initialState = {
    isLoggedIn: false,
    hasPasswordResetTokenSent: false,
    type: 'talent',
    isEditable: false
}

const auth_reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.GOT_EXTERNAL_LOGINS:
            return Object.assign({}, state, action.data);
        case Types.EXTERNAL_LOGIN_START:
            return Object.assign({}, state, { externalLoginUrl: action.data });
        case Types.LOGIN_SUCCESS:
            return Object.assign({}, state, { isLoggedIn: true, header: action.data });
        case Types.LOGIN_FAIL:
            return state;
        case Types.SIGNUP_SUCCESS:                                  
            return Object.assign({}, state);
        case Types.SIGNUP_FAIL:            
            return Object.assign({}, state, { error: action.data });
        case Types.SENT_PASSWORD_RESET_TOKEN_SUCCESS:
            return Object.assign({}, state, { hasPasswordResetTokenSent: true });
        case Types.SENT_PASSWORD_RESET_TOKEN_FAILURE:
            return Object.assign({}, state, { error: action.data });
        case Types.SET_NEW_PASSWORD_SUCCESS:
            return Object.assign({}, state, { hasPasswordResetTokenSent: false });
        case Types.SET_NEW_PASSWORD_FAILURE:
            return Object.assign({}, state, { error: action.data });
        case Types.SIGNUP_TYPE:            
            return Object.assign({}, state, { type: action.signUpType })
        case Types.EDIT_TYPE:              
            return Object.assign({}, state, { isEditable: action.flag })
        default:
            return state;
    }   
}

export default auth_reducer