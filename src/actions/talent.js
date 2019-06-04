import * as Types from '../constants/actionType'
import { request } from '../services/request'

export const getSubRolesAndTechs = (data) => {
    return {
        type: Types.GET_ROLES_TECH,
        data,
    }
}

export const getSubmitionData = (data) => {
    return {
        type: Types.GET_SUBMITION_DATA,
        data
    }
}

export const updateStatus = (status) => {
    return {
        type: Types.UPDATE_STATUS,
        status
    }
}

export const updateCategory = (key, data) => {    
    return {
        type: Types.UPDATE_CATEGORY,
        key,
        data
    }
}

export function getUserProfile(headers) {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            request('Profile/my', null, 'GET', headers)
                .then(
                    response => {
                        console.log('getUserProfile.done:', response);
                        dispatch({
                            type: Types.GET_USER_PROFILE_SUCCESS,
                            data: response
                        })
                        resolve(response);
                    },
                    error => {
                        console.log('getUserProfile.fail:', error);
                        dispatch({
                            type: Types.GET_USER_PROFILE_FAILURE,
                            data: error
                        })
                        reject(error);
                    }
                )
        })
    }
}

export function PostSignUp1(data,type){
    console.log(data)
    return function (dispatch) {
    dispatch({
        type: type,
        data: { fullName: data.FirstName + ' ' + data.LastName, location: data.Location }
    })
    }
    // return {
    //     payload: {fullName: data.FirstName + ' ' + data.LastName, location:data.Location},
    //     type: type
    //   }
}

export function storeUserProfile(data,type){
    return function(dispatch){
        dispatch({
            type:type,
            data:data
        })
    }
}
export function postSignup1Data(step, data, headers){
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            request(step, data, "POST", headers)
                .then(response => {
                    console.log('postSignup1Data.done:data:', data);
                    console.log('postSignup1Data.done:response:', response);
                    dispatch({
                        type: Types.PROFILE_STEP_1_SUCCESS,
                        data: { profileId: response, fullName: data.FirstName + ' ' + data.LastName, location: data.Location }
                    })
                    resolve(true);
                })
                .catch(error => {
                    console.log('Error', error)
                    dispatch({
                        type: Types.PROFILE_STEP_1_FAILURE,
                        data: error
                    })
                    reject(false);
                })
        })
    }
}

export function postSignup2Data(step, data, headers){
    return function () {
        return new Promise((resolve, reject) => {
            request(step, data, "POST", headers)
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

export function postSubmitionData(step, data, headers){
    return function () {
        return new Promise((resolve, reject) => {
            request(step, data, "POST", headers)
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

export function getProfileInfo(step, headers){
    return function () {
        return new Promise((resolve, reject) => {
            request(step, null, "GET", headers)
                .then(response => {                  
                    resolve(response);
                })
                .catch(error => {
                    console.log('Error', error)                    
                    reject(false);
                })
        })
    }
}

export function updateProfileInfo(step, data, headers){
    return function () {
        return new Promise((resolve, reject) => {
            console.log('updateProfileInfo:data', data);
            request(step, data, "PUT", headers)
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