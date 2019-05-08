import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import ReactLoading from 'react-loading'


import Header from '../../../components/Header'

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
import LinkedIn from "linkedin-login-for-react";
import Cookies from 'universal-cookie';
import axios from 'axios';
const expires = new Date()
expires.setDate(expires.getDate() + 14)
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
const cookies = new Cookies();
const responseGoogle = (response) => {
    console.log(response);
    if(response.error){
        console.log(response.error)
    }else{
        const expires = new Date()
        expires.setDate(expires.getDate() + 14)
        let userInfo = {
            log:response.Zi.access_token,
            email:response.profileObj.email,
            firstName:response.profileObj.givenName,
            lastName:response.profileObj.familyName,
            image:response.profileObj.imageUrl,
            name:response.profileObj.name,
            id:response.Zi.access_token
        }
        userInfo = JSON.stringify(userInfo);
        userInfo = JSON.parse(userInfo);
        // console.log(userInfo);
        cookies.set('userInfo', userInfo, { path: '/' });
        let bodyFormData = new FormData();
        bodyFormData.append('Name',response.profileObj.name);
        bodyFormData.append('Email',response.profileObj.email);
        bodyFormData.append('Token',response.Zi.access_token);
        axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/SocialMediaLogin',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                    cookies.set('userInfo',userInfo,{path:'/',expires:expires})
                    cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                    browserHistory.push('/profile/talent/person');
            }).catch((err) => {
                console.log(err)
                // this.setState({ 
                //     isLoading: false,
                //     isError:true,
                //     isSuccess:false
                //  });
                 
            });

        
    }

        console.log(cookies.get('userInfo').loggedIn);
  }
//   const responseFacebook = (response) => {
//     console.log(response);
//   }

  const successStyle ={
    color: 'green',
    fontSize: '23px'
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
            errorMessage: null,
            isSuccess:false,
            state:false
        }
    }

    componentWillMount() {
        // this.props.dispatch(getExternalLogins());
        // this.props.actions.getExternalLogins();
        // if(this.props.isLoggedIn){
        //     browserHistory.push('/profile/talent/candidate')
        // }
        if(!cookies.get('isLoggedIn')){
            cookies.set('isLoggedIn',false,{path:'/'})
        }
        if(cookies.get('isLoggedIn')==='false'){
            console.log("LoggedIn Not Define? "+cookies.get('isLoggedIn'))
              
           
        }else{
            console.log("LoggedIn Enabled True? "+cookies.get('isLoggedIn'))
             browserHistory.push('/profile/talent/person');
        }

        cookies.set('authType', 'talent', { path: '/' },expires,expires);
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
        const { isEmail, isFullName,isCity } = this.state
        this.setState({ isValidate: true })
        if(!isEmail || !isFullName || !isCity ) {
        // if(!isEmail || !isFullName || !isCity || !isProfileLink ) {
            return
        }
        var rand = function() {
            return Math.random().toString(36).substr(2); // remove `0.`
        };
        
        var token = function() {
            return rand() + rand() + rand() + rand(); // to make it longer
        };
        var trans = function() {
            return rand() + rand() // to make it longer
        };
        
        
        this.setState({ isLoading: true })
        const obj = {
            name:this.state.fullName,
            email: this.state.email,
            token:token(),
            transactionId:trans(),
            city:this.state.city,
            socialLink:this.state.profileLink,
            passwordUrl:window.location.origin+"/talent-change-password"
        }   
        this.props.actions.reset()   

        let bodyFormData = new FormData();
        bodyFormData.append('Name',this.state.fullName);
        bodyFormData.append('Email',this.state.email);
        bodyFormData.append('Token',token());
        bodyFormData.append('transactionId',trans());
        bodyFormData.append('city',this.state.city);
        bodyFormData.append('socialLink',this.state.profileLink);
        bodyFormData.append('passwordUrl',window.location.origin+"/talent-change-password");
        axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/UserRegistration',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                console.log(response.data.data[0])
                if(response.data.data[0].ret==='1'){
                    this.setState({ 
                        isLoading: false,
                        isError:false,
                        isSuccess:true
                    });
                }else{
                    this.setState({ 
                        isLoading: false,
                        errorMessage:response.data.data[0].message,
                        isSuccess:false
                    });
                }
            }).catch((err) => {
                console.log(err)
                this.setState({ 
                    isLoading: false,
                    isError:true,
                    isSuccess:false
                 });
                 
            });

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
            cookies.set('isLoggedIn',true,{path:'/',expires:expires})
            browserHistory.push('/profile/talent/person');
        }
      };
    render() {
        const { isEmail, isFullName, isCity,isProfileLink, isValidate, isLoading, errorMessage } = this.state
        return (
            <Wrapper>                      
                <Header/>                       
                <Content>
                    <Heading>Sign up now</Heading>
                    <ButtonWrapper>
                    <div className="sc-jbKcbu hQpXBD">
                        <GoogleLogin
                            clientId={urls.GOOGLE_KEY}
                            onSuccess={responseGoogle}
                            render={renderProps => (
                                <div onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ display:"inline-flex" }}>
                                    <img src="/assets/svgs/google-icon.svg" alt="google"/>
                                    <p>Sign up with Google</p>
                                </div>
                                
                              )}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            // isSignedIn={'true'}
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
                            text="Sign up With LinkedIn"
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
                    {/* { this.props.hasExternalLogins && this.props.externalLogins['facebook'] &&
                        <SocialButton onClick={() =>this.handleSocialLogin('facebook')}>
                            <img src={Images.facebook1} alt="facebook" />
                            <p>Sign up with Facebook</p>
                        </SocialButton> } */}
                    </ButtonWrapper>
                    <CircleButton>Or</CircleButton>
                    {/* { this.props.hasExternalLogins && <CircleButton>Or</CircleButton> } */}
                    {/* { isValidate && (!isEmail || !isFullName || !isCity || !isProfileLink) */}
                    { isValidate && (!isEmail || !isFullName || !isCity)
                        ? <Text>Please fill in required fields</Text>
                        : null
                    }
                    { this.state.isSuccess?
                    <p className="sc-jqCOkK" style={successStyle}>Successfully Registered! Please check your Email.</p>
                    :null
                    }
                    
                    { errorMessage ? <Text>{errorMessage}</Text> : null }
                    <Form ref={(el) => this.myFormRef = el}>
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
                    <Form ref={(el) => this.myFormRef = el}>
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
                     <Form ref={(el) => this.myFormRef = el}>
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
                    <Form ref={(el) => this.myFormRef = el}>
                        <MuiThemeProvider>
                            <TextField
                                name="profileLink"
                                type="text"
                                onChange={this.getValue}
                                floatingLabelText="Social Link"
                                floatingLabelStyle={ styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isProfileLink && <Img src={Images.check} alt="checked"></Img> }
                        {/* { isValidate && !isProfileLink && <Img src={Images.warnning} alt="warnning"></Img> } */}
                        { !isProfileLink && !isValidate && <Img empty></Img> } 
                    </Form> 
                     <UnderLine></UnderLine>
                    

                    { isLoading
                        ? <SpinWrapper><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></SpinWrapper>
                        :
                        <ButtonWrapper signup>
                        { !isValidate || (isEmail && isFullName && isCity )
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