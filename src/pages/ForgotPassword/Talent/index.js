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
    // CircleButton, 
    Text, 
    Form, 
    UnderLine, 
    Img, 
    SignUpButton } from './Style'
import Images from '../../../themes/images'
import * as Validate from '../../../constants/validate'
import { reset } from '../../../reducers'
import { getPasswordResetToken, setNewPassword } from '../../../actions/auth'
import axios from 'axios';
import * as urls from '../../../constants/urls';
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

class ForgotPassword extends Component {
    constructor(props){
        super(props)  
        this.state = {
            isEmail: false,
            isPassword: false,
            isConfirmPassword: false,
            isValidate: false,
            isLoading: false,
            isCodeSent:false,
            isError:false
        }
    }

    componentWillMount() {
        if(this.props.isLoggedIn){
            browserHistory.push('/profile/talent')
        }
    }

    getValue = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value})
        if (name === 'email') {
            this.setState({ isEmail: Validate.emailValidate(value)})
        }
        if (name === 'token') {
            this.setState({ isCode: Validate.codeValidate(value)})
        }
        if (name === 'newPassword') {
            this.setState({ isPassword: Validate.passwordValidate(value)})
        }
        if (name === 'confirmPassword') {
            this.setState({ isConfirmPassword: Validate.confirmPasswordValidate(value, this.state.newPassword)})
        }
        e.preventDefault()
    }

    handleSubmit = () => {

            const { isEmail } = this.state
            this.setState({ isValidate: true })
            if(!isEmail) {
                return
            }
            this.setState({ isLoading: true })
            // const obj = {
            //     email: this.state.email,
            // }
            let bodyFormData = new FormData();
            bodyFormData.append('Email',this.state.email);
            bodyFormData.append('URL',window.location.origin+"/talent-change-password");
            axios({
                method: 'post',
                url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/SendEmail',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then((response) => {
                    console.log(response)
                    this.setState({ 
                        isLoading: false,
                        isCodeSent:true
                     })
                }).catch((err) => {
                    console.log(err)
                    this.setState({ 
                        isLoading: false,
                        isError:true,
                     });
                     
                });

            // this.props.actions.reset()
            // this.props.actions.getPasswordResetToken(obj)
            //     .then(() => {
            //         this.setState({ isLoading: false })
            //     })
            //     .catch((error) => {
            //         this.setState({ isLoading: false })
            //     })
    }

    render() {
        const { isEmail, isCode, isPassword, isConfirmPassword, isValidate, isLoading } = this.state;
        const newPasswordElement = (
            <Wrapper>
                <Form>
                    <MuiThemeProvider>
                        <TextField
                            name="token"
                            onChange={this.getValue}
                            floatingLabelText="Verification code"
                            floatingLabelStyle={ isValidate && !isCode ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                            floatingLabelShrinkStyle={ isValidate && !isCode ? styles.focusStyle.error : styles.focusStyle.success }
                            underlineShow={false}
                            />              
                    </MuiThemeProvider> 
                    { isCode && <Img src={Images.check} alt="checked"></Img> }
                    { !isCode && isValidate && <Img src={Images.warnning} alt="warnning"></Img> }
                    { !isCode && !isValidate && <Img empty></Img> } 
                </Form>
                { !isCode && isValidate
                    ? <UnderLine error></UnderLine>
                    : <UnderLine></UnderLine>
                }
                <Form>
                    <MuiThemeProvider>
                        <TextField
                            name="newPassword"
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
                { !isPassword && isValidate
                    ? <UnderLine error></UnderLine>
                    : <UnderLine></UnderLine>
                }
                <Form>
                    <MuiThemeProvider>
                        <TextField
                            name="confirmPassword"
                            type="password"
                            onChange={this.getValue}
                            floatingLabelText="Confirm Password"
                            floatingLabelStyle={ isValidate && !isConfirmPassword ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                            floatingLabelShrinkStyle={ isValidate && !isConfirmPassword ? styles.focusStyle.error : styles.focusStyle.success }
                            underlineShow={false}
                            />              
                    </MuiThemeProvider> 
                    { isConfirmPassword && <Img src={Images.check} alt="checked"></Img> }
                    { isValidate && !isConfirmPassword && <Img src={Images.warnning} alt="warnning"></Img> }
                    { !isConfirmPassword && !isValidate && <Img empty></Img> } 
                </Form> 
                { !isConfirmPassword && isValidate
                    ? <UnderLine error></UnderLine>
                    : <UnderLine></UnderLine>
                }
            </Wrapper>
        );         
        return (
            <Wrapper>                      
                <Header/>                       
                <Content>
                <Heading>Forgot your password?</Heading>
                    { this.state.isCodeSent?
                        <Heading>Verification code was sent to the email address.</Heading>:null
                    }
                    
                    { isValidate && !isEmail 
                        ? <Text>Please fill in required fields</Text>
                        : null
                    }
                    { this.state.isError ? <Text>Email does not exist!</Text> : null }
                    <Form style={{ marginTop:"20px" }}>
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
                    {/* { this.props.hasPasswordResetTokenSent ? newPasswordElement : null } */}
                    { isLoading ? <SpinWrapper><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></SpinWrapper> :
                        <ButtonWrapper signup>
                            {
                             !isValidate
                             || (!this.props.hasPasswordResetTokenSent && isEmail)
                             || (this.props.hasPasswordResetTokenSent && isEmail && isPassword && isConfirmPassword)
                                 ? <SignUpButton active onClick={this.handleSubmit}>Submit</SignUpButton>
                                 : <SignUpButton onClick={this.handleSubmit}>Submit</SignUpButton>
                            }
                        </ButtonWrapper>
                    }                    
                </Content>
            </Wrapper>
        );
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error,
        hasPasswordResetTokenSent: state.auth.hasPasswordResetTokenSent
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            reset,
            getPasswordResetToken,
            setNewPassword
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)