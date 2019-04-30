import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers'

const persistConfig = {
	key: 'primary',
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
    const middlewares = [
        thunkMiddleware
    ];

    const store = createStore(persistedReducer, undefined, compose(
        applyMiddleware(...middlewares)
    ));
    let persistor = persistStore(store)
    return { store, persistor }
};
export default configureStore