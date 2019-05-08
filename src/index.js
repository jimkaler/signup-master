import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { Router, browserHistory } from 'react-router'

import configureStore from './store/configureStore'
import routes from './routes'
import registerServiceWorker from './registerServiceWorker'
import ReactGA from 'react-ga'
import mixpanel from 'mixpanel-browser'
import MixpanelProvider from 'react-mixpanel'
import { PersistGate } from 'redux-persist/integration/react'
import HttpsRedirect from 'react-https-redirect';
mixpanel.init("70d40c11476f564b54bc2cdca8c51526")

ReactGA.initialize('UA-108603873-1', {
    debug: false
})

const logPageView = () => {    
    ReactGA.set({ page: window.location.pathname + window.location.search })
    ReactGA.pageview(window.location.pathname + window.location.search)
}

const { store, persistor } = configureStore()

ReactDOM.render(
    <MixpanelProvider mixpanel={mixpanel}>
        <Provider store={store}>
            <HttpsRedirect>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={browserHistory} routes={routes} onUpdate={logPageView}/>
                </PersistGate>
            </HttpsRedirect>
        </Provider>
    </MixpanelProvider>
    , document.getElementById('root'))
registerServiceWorker()
