import * as Types from '../constants/actionType'

const initialState = {
    fullName: '',
    email: '',
    phone: '',
    skype: '',
    roles: [],
    subRoles: [],
    techs: [],
    locations : [],
    beverage: '',
    social: [],
    status: null,
    isCompleted: false
}

const talent_reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.STORE_USER_PROFILE:
            return Object.assign({}, state, {
                profileId: action.data.id,
                fullName: action.data.fullName,
                email: action.data.email,
                // phone: action.data.phone,
                // skype: action.data.skype,
                // proPicURL: action.data.proPicURL,
                location: action.data.location,
                roles: action.data.roles,
                techs: action.data.technologies,
                subRoles: action.data.subRoles,
                locations: action.data.locations,
                beverage: action.data.beverage,
                social: action.data.socialMedia,
                // status: action.data.jobSeekingStatus,
                isCompleted: action.data.locations.length > 0
            });
        case Types.GET_USER_PROFILE_SUCCESS:
            console.log("I am calling")
            return Object.assign({}, state, {
                profileId: action.data.id,
                fullName: action.data.fullName,
                email: action.data.email,
                phone: action.data.phone,
                skype: action.data.skype,
                proPicURL: action.data.proPicURL,
                location: action.data.location,
                roles: action.data.roles,
                techs: action.data.technologies,
                subRoles: action.data.subRoles,
                locations: action.data.locations,
                beverage: action.data.beverage,
                social: action.data.socialMedia,
                status: action.data.jobSeekingStatus,
                isCompleted: action.data.locations.length > 0
            });
        case Types.GET_USER_PROFILE_FAILURE:
            return state;
        case Types.PROFILE_STEP_1_SUCCESS:
            return Object.assign({}, state, { profileId: action.data.profileId, fullName: action.data.fullName, location: action.data.location });
        case Types.PROFILE_STEP_1_FAILURE:
            return state;
        case Types.GET_ROLES_TECH:
            return Object.assign({}, state, { 
                roles: action.data.Roles, techs: action.data.Technologies, subRoles: action.data.SubRoles
            });
        case Types.GET_SUBMITION_DATA:                                              
            return Object.assign({}, state, { 
                locations: action.data.Locations, beverage: action.data.Beverage, social: action.data.Social, status: action.data.Status, isCompleted: true
            })
        case Types.UPDATE_STATUS:                        
            return Object.assign({}, state, {
                status: action.status
            })   
        case Types.UPDATE_CATEGORY:            
            if (action.key === 'role')                
                return Object.assign({}, state, { subRoles: action.data})
            else if (action.key === 'tech')
                return Object.assign({}, state, { techs: action.data})          
            else
                return Object.assign({}, state, { locations: action.data})                
        default:
            return state;
    }   
}

export default talent_reducer