import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import ReactLoading from 'react-loading'

import Header from '../../../components/Header'
import SocialButtons from '../../../components/ButtonJs'
import { 
    Wrapper, 
    Content, 
    Heading, 
    ButtonWrapper,
    SpinWrapper, 
    SocialButton,
    CircleButton, 
    Text, 
    Form, 
    UnderLine, 
    Img, 
    SignUpButton } from './Style'
import Images from '../../../themes/images'
import * as urls from '../../../constants/urls'
import { signUpRequest, signInRequest, getExternalLogins, startExternalLogin } from '../../../actions/auth'
import { reset } from '../../../reducers'
import * as Validate from '../../../constants/validate'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// import LinkedIn from 'react-linkedin-login';
import LinkedIn from "linkedin-login-for-react";

const styles = {
    floatingLabelStyle: {
        error : {
            color: '#f7be28'
        },
        success : {
            color: '#565252'
        }        
    },
    focusStyle: {
        error : {
            color: '#f7be28',
            fontWeight: 700,
            transform: 'scale(0.75) translate(0px, -35px)'
        },
        success : {
            color: '#333',
            fontWeight: 700,
            transform: 'scale(0.75) translate(0px, -35px)'
        }         
    }
}
const responseGoogle = (response) => {
    console.log(response);
  }
  const responseFacebook = (response) => {
    console.log(response);
  }
  const spanStyle ={
      display:'flex'
  }
  const pStyle ={
      fontFamily:'NudistaLight'
  }
  
class SignUp extends Component {
    constructor(props){
        super(props)  
        this.state = {
            isEmail: false,
            isPassword: false,
            isConfirmPassword: false,
            isCity:false,
            isFullName:false,
            isProfileLink:false,
            isValidate: false,
            isLoading: false,
            errorMessage: null
        }
    }

    componentWillMount() {
        // this.props.dispatch(getExternalLogins());
        this.props.actions.getExternalLogins();
        if(this.props.isLoggedIn){
            browserHistory.push('/profile/talent/candidate')
        }
    }

    componentDidMount() {
        if (!this.props.hasExternalLogins) {
            // Request external login providers
            this.props.actions.getExternalLogins();
            // this.props.dispatch(getExternalLogins());
        }
        console.log('SignUp:componentDidMount');
    }

    getValue = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value})
        if (name === 'email') {
            this.setState({ isEmail: Validate.emailValidate(value)})
        }
        if (name === 'fullName') {
            console.log(Validate.fullnameValidate(value));
            this.setState({ isFullName: Validate.fullnameValidate(value)})
        }
        if (name === 'city') {
            this.setState({ isCity: Validate.placeValidate(value)})
        }
        if (name === 'profileLink') {
            this.setState({ isProfileLink: Validate.socialValidate(value)})
        }
        // if (name === 'password') {
        //     this.setState({ isPassword: Validate.passwordValidate(value)})
        // }
        // if (name === 'confirmPassword') {
        //     this.setState({ isConfirmPassword: Validate.confirmPasswordValidate(value, this.state.password)})
        // }
        e.preventDefault()
    }

    handleSignUp = () => {                       
        const { isEmail, isFullName,isCity,isProfileLink, isPassword, isConfirmPassword } = this.state
        this.setState({ isValidate: true })
        if(!isEmail || !isFullName || !isCity || !isProfileLink ) {
        // if(!isEmail || !isFullName || !isCity || !isProfileLink ) {
            return
        }
        this.setState({ isLoading: true })
        const obj = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }   
        this.props.actions.reset()     
        this.props.actions.signUpRequest(obj)
        .then(() => {
            console.log('signInRequest.start')
            const credentials = {
                username: this.state.email,
                password: this.state.password
            }
            return this.props.actions.signInRequest(credentials);
        })
        .then(() => {
            browserHistory.push('/profile/talent/candidate')
        })
        .catch((error) => {
            this.setState({ errorMessage: this.props.error })
            this.setState({ isLoading: false })
        })
    }

    handleSocialLogin = (social) => {
        const externalLoginUrl = urls.API_HOST + this.props.externalLogins[social].url;
        this.props.actions.startExternalLogin(externalLoginUrl);
        window.location.href = externalLoginUrl;
    }

    callbackLinkedIn = (error, code, redirectUri) => {
        if (error) {
          // signin failed
          console.log(error);
        } else {
            console.log(code);
            console.log(redirectUri);
          // Obtain authorization token from linkedin api
          // see https://developer.linkedin.com/docs/oauth2 for more info
        }
      };
    render() {
        console.log(this.props);
        const { isEmail, isFullName, isCity,isProfileLink, isValidate, isLoading, errorMessage } = this.state             
        return (
            <Wrapper>                      
                <Header/>                       
                <Content>
                    <Heading>Sign up now</Heading>
                    <ButtonWrapper>
                    <div className="sc-jbKcbu hQpXBD">
                        <GoogleLogin
                            clientId="674955079351-aj6d9o466o2hhcvsh78it0695egdcmvh.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            render={renderProps => (
                                <div onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ display:"inline-flex" }}>
                                    <img src="/assets/svgs/google-icon.svg" alt="google"/>
                                    <p>Sign up with Google</p>
                                </div>
                                
                              )}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={'true'}
                            icon={'false'}
                        />
                    </div>
                    {/* <FacebookLogin
                        appId="353197588660922"
                        autoLoad={true}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={responseFacebook} 
                    /> */}
                     <div className="sc-jbKcbu linKDN">
                        <LinkedIn
                            clientId="81rg1g83flx6m5"
                            callback={this.callbackLinkedIn}
                            text="Login With LinkedIn"
                            img={Images.google}
                            alt={'linkedIn'}
                        >
                        <img src={Images.google} alt="google" />
                            <p>Sign up with Google</p>
                        </LinkedIn>
                     </div>
                    {/* <SocialButtons
                    provider='google'
                    appId='674955079351-aj6d9o466o2hhcvsh78it0695egdcmvh.apps.googleusercontent.com'
                    onLoginSuccess={this.handleSocialLogins}
                    onLoginFailure={this.handleSocialLoginFailures}
                    >
                    Login with Google
                    </SocialButtons> */}
                    
                    {/* { this.props.hasExternalLogins && this.props.externalLogins['google'] && */}
                        <SocialButton style={{ display:"none" }} google onClick={() =>this.handleSocialLogin('google')}>
                            <img src={Images.google} alt="google" />
                            <p>Sign up with Google</p>
                        </SocialButton>
                    {/* }*/}
                    { this.props.hasExternalLogins && this.props.externalLogins['facebook'] &&
                        <SocialButton onClick={() =>this.handleSocialLogin('facebook')}>
                            <img src={Images.facebook1} alt="facebook" />
                            <p>Sign up with Facebook</p>
                        </SocialButton> }
                    </ButtonWrapper>
                    <CircleButton>Or</CircleButton>
                    { this.props.hasExternalLogins && <CircleButton>Or</CircleButton> }
                    {/* { isValidate && (!isEmail || !isFullName || !isCity || !isProfileLink) */}
                    { isValidate && (!isEmail || !isFullName || !isCity || !isProfileLink)
                        ? <Text>Please fill in required fields</Text>
                        : null
                    }
                    { errorMessage ? <Text>{errorMessage}</Text> : null }
                    <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="fullName"
                                type="text"
                                onChange={this.getValue}
                                floatingLabelText="Full Name"
                                floatingLabelStyle={ isValidate && !isFullName ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isFullName ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isFullName && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isFullName && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isFullName && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isFullName && isValidate ?
                        <UnderLine error></UnderLine> : <UnderLine></UnderLine>
                    }
                    <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="email"
                                onChange={this.getValue}
                                floatingLabelText="E-mail"
                                floatingLabelStyle={ isValidate && !isEmail ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isEmail ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isEmail && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isEmail && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isEmail && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isEmail && isValidate ?
                        <UnderLine error></UnderLine> : <UnderLine></UnderLine>
                    }
                     <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="city"
                                type="text"
                                onChange={this.getValue}
                                floatingLabelText="Where do you live?"
                                floatingLabelStyle={ isValidate && !isCity ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isCity ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isCity && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isCity && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isCity && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isCity && isValidate
                        ? <UnderLine error></UnderLine>
                        : <UnderLine></UnderLine>
                    }
                    <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="profileLink"
                                type="text"
                                onChange={this.getValue}
                                floatingLabelText="Social Link"
                                floatingLabelStyle={ isValidate && !isProfileLink ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isProfileLink ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isProfileLink && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isProfileLink && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isProfileLink && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isProfileLink && isValidate
                        ? <UnderLine error></UnderLine>
                        : <UnderLine></UnderLine>
                    }

                    { isLoading
                        ? <SpinWrapper><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></SpinWrapper>
                        :
                        <ButtonWrapper signup>
                        { !isValidate || (isEmail && isFullName && isCity && isProfileLink )
                                ? <SignUpButton active onClick={this.handleSignUp}>Sign Up</SignUpButton>
                                : <SignUpButton onClick={this.handleSignUp}>Sign Up</SignUpButton>
                            }
                        </ButtonWrapper>
                    }                    
                </Content>
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error,
        externalLogins: state.auth.externalLogins,
        hasExternalLogins: state.auth.hasExternalLogins
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            signUpRequest,
            signInRequest,
            getExternalLogins,
            startExternalLogin,
            reset
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)