import React, { Component } from 'react'
import ReactLoading from 'react-loading'
// import { persistStore } from 'redux-persist'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { browserHistory } from 'react-router'
import { reset } from './reducers'
import { getUserInfo, registerExternalUser } from './actions/auth'
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount() {

        let bodyFormData = new FormData();
        bodyFormData.append('grant_type','authorization_code');
        bodyFormData.append('code','AQT4g_IegUbOnLh5pf-HGgCBM68E3cjhBKl6m8AST7xeIz6bFkwOxV68x0iNyMkeoN6DhOnCwWF-9_PR0m82VKljlWsd1S81dbJ3PhV1RQ5r1Yghiz6bA1IP5xIMm3LutWxR8j_pHh1x4E24E-YHgRm-JEYtHf4j6syJ4RHBqrrGVbM3cbeKRAmrwiRupw');
        bodyFormData.append('redirect_uri','http://localhost:3000/signin/talent');
        bodyFormData.append('client_id','81rg1g83flx6m5');
        bodyFormData.append('client_secret','xNy9yvg0R7ub4S46');

        axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://linkedin.com/oauth/v2/accessToken',
            data: bodyFormData,
            config: { headers: {'Content-Type': ' application/x-www-form-urlencoded' }}
            })
            .then((response) => {
                console.log(response);
                    // cookies.set('userInfo',userInfo,{path:'/',expires:expires})
                    // cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                    // browserHistory.push('/profile/talent/person');
            }).catch((err) => {
                console.log(err)
                // this.setState({ 
                //     isLoading: false,
                //     isError:true,
                //     isSuccess:false
                //  });
                 
            });

        // cookies.remove('isLoggedIn', { path: '/' })
        console.log("App Cokies "+cookies.get('isLoggedIn'))
        const hash = window.location.hash;
        const urlFragments = this.parseUrlFragments(hash);
        window.location.hash = '';
        const accessToken = urlFragments['access_token'];
        const headers = {};
        if (accessToken) {
            headers.Authorization = 'Bearer ' + accessToken;
        }

        if (!headers.Authorization && this.props.authHeader) {
            headers.Authorization = this.props.authHeader;
        }

        this.props.actions.getUserInfo(headers)
        .then(user => {
            console.log('App:isLoggedIn: ' + this.props.isLoggedIn);
            if (!user.hasRegistered) {
                const data = { Email: user.email };
                return this.props.actions.registerExternalUser(data, headers);
            }
            this.setState({isLoading: false});
        })
        .then(() => {
            if (!this.props.isLoggedIn) {
                console.log('App: start external login flow again');
                window.location.href = this.props.externalLoginUrl;
            } else {
                this.setState({isLoading: false});
            }
        })
        .catch((error) => {
            this.setState({isLoading: false});
        });
    }
    
    componentDidMount() {
        this.context.mixpanel.track('App did mount');
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div style={{display:'flex', justifyContent:'center'}}>
                    <ReactLoading type="bubbles" style={{ fill:"rgb(76, 191, 105)", height:"100px",width:"100px" }}  />
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
    }

    parseUrlFragments(urlHash) {
        let hash = urlHash.substring(1);
        let fragments = hash.split('&');
        let result = {};

        for (let i = 0; i < fragments.length; i++)
        {
            let keyValue = fragments[i].split('=');
            result[keyValue[0]] = keyValue[1];
        }

        return result;
    }
}

App.contextTypes = {
    mixpanel: PropTypes.object.isRequired
}

// Map state to props
const mapStateToProps = (state) => {
    return {
        authHeader: state.auth.header,
        isLoggedIn: state.auth.isLoggedIn,
        externalLoginUrl: state.auth.externalLoginUrl
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getUserInfo,
            registerExternalUser,
            reset
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(App)