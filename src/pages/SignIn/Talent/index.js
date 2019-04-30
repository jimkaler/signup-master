import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactLoading from 'react-loading'
import * as urls from '../../../constants/urls'
import { getExternalLogins, signInRequest, startExternalLogin } from '../../../actions/auth'
import { reset } from '../../../reducers'


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
    SignInButton,
    SignUpButton,
    SignUpText,
    ForgotPasswordLink,
    ForgotPasswordText
} from './Style'
import Images from '../../../themes/images'
import * as Validate from '../../../constants/validate'

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

class SignIn extends Component {
    constructor(props){
        super(props)        
        this.state = {
            isValidate: false,
            isEmail: false,
            isPassword: false, 
            isLoading: false,
            errorMessage: null
        }
    }

    componentWillMount() {
        if(this.props.isLoggedIn){
            browserHistory.push('/profile/talent/candidate')
        }
        console.log('SignIn:componentWillMount');
    }

    componentDidMount() {
        if (!this.props.hasExternalLogins) {
            // Request external login providers
            this.props.actions.getExternalLogins();
        }
        console.log('SignIn:componentDidMount');
    }

    getValue = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value})
        if(name === 'email'){
            this.setState({ isEmail: Validate.emailValidate(value)})
        }
        if(name === 'password'){
            this.setState({ isPassword: Validate.passwordValidate(value)})
        }
        e.preventDefault()
    }

    handleSocialLogin = (social) => {
        const externalLoginUrl = urls.API_HOST + this.props.externalLogins[social].url;
        this.props.actions.startExternalLogin(externalLoginUrl);
        window.location.href = externalLoginUrl;
    }

    handleSignIn = () => {                       
        const { isEmail, isPassword } = this.state
        this.setState({ isValidate: true })
        if(!isEmail || !isPassword ){
            return
        }
        this.setState({ isLoading: true })
        const obj = {
            username: this.state.email,
            password: this.state.password
        }
        this.props.actions.reset();
        this.props.actions.signInRequest(obj)
            .then(() => {
                browserHistory.push('/profile/talent/candidate')
            })
            .catch((error) => {
                this.setState({ errorMessage: 'The user name or password is incorrect.' })
                this.setState({ isLoading: false })
            })
    }

    handleSignUp = () => {
        browserHistory.push('/signup/talent');
    }

    handleForgotPassword = () => {
        this.props.actions.reset()
        browserHistory.push('/get-password/talent');
    }

    render() {
        const { isEmail, isPassword, isValidate, isLoading, errorMessage } = this.state             
        return (
            <Wrapper>                      
                <Header/>                       
                <Content>
                    <Heading>Sign in now</Heading>
                    { errorMessage ? <Text>{errorMessage}</Text> : null }
                    <ButtonWrapper>
                    { this.props.hasExternalLogins && this.props.externalLogins['google'] &&
                        <SocialButton google onClick={() =>this.handleSocialLogin('google')}>
                            <img src={Images.google} alt="google" />
                            <p>Sign in with Google</p>
                        </SocialButton> 
                        }
                    { this.props.hasExternalLogins && this.props.externalLogins['facebook'] &&
                        <SocialButton onClick={() =>this.handleSocialLogin('facebook')}>
                            <img src={Images.facebook1} alt="facebook" />
                            <p>Sign in with Facebook</p>
                        </SocialButton> }
                    </ButtonWrapper>
                    { this.props.hasExternalLogins && 
                    <CircleButton>Or</CircleButton> 
                    }
                    {    isValidate && (!isEmail || !isPassword ) ?
                        <Text>Please fill in required fields</Text> : null
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
                                name="password"
                                type="password"
                                onChange={this.getValue}
                                floatingLabelText="Password"
                                floatingLabelStyle={ isValidate && !isPassword ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isPassword ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isPassword && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isPassword && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isPassword && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isPassword && isValidate ?
                        <UnderLine error></UnderLine> : <UnderLine></UnderLine>
                    }
                    <ForgotPasswordText><ForgotPasswordLink onClick={this.handleForgotPassword}>Forgot password?</ForgotPasswordLink></ForgotPasswordText>
                    { isLoading ? <SpinWrapper><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></SpinWrapper> :
                        <ButtonWrapper>
                            <SignUpText>
                                Have no account yet? <SignUpButton onClick={this.handleSignUp}>Sign up</SignUpButton>
                            </SignUpText>
                            { !isValidate || (isEmail && isPassword) ?
                                <SignInButton active onClick={this.handleSignIn}>Sign in</SignInButton> :
                                <SignInButton onClick={this.handleSignIn}>Sign in</SignInButton>
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
        externalLogins: state.auth.externalLogins,
        hasExternalLogins: state.auth.hasExternalLogins
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getExternalLogins,
            signInRequest,
            startExternalLogin,
            reset
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)