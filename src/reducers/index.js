import { combineReducers } from 'redux'
// import storage from 'redux-persist/lib/storage'
import auth from './auth'
import talent from './talent'
import employer from './employer'

export const reset = () =>{ return { type: 'RESET' }}

const reducers = combineReducers({
    auth,
    talent,
    employer
});

const rootReducer = (state, action) =>
	action.type === 'RESET'
	? reducers(
		Object.assign({}, auth: {
			externalLogins: state.auth.externalLogins,
			hasExternalLogins: state.auth.hasExternalLogins
		}),
		action)
	: reducers(state, action)

export default rootReducer