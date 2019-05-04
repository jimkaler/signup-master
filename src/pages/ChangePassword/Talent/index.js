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
import { getPasswordResetToken } from '../../../actions/auth'
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
const successStyle ={
    color: 'green',
    fontSize: '23px'
  }

class ChangePassword extends Component {
    constructor(props){
        super(props)  
        this.state = {
            isEmail: false,
            isOldPassword:false,
            isPassword: false,
            isConfirmPassword: false,
            isValidate: false,
            isLoading: false,
            uid:'',
            isError:false,
            isSuccess:false,
            errorText:"Something Went Wrong"
        }
    }

    componentWillMount() {
        if(this.props.isLoggedIn){
            browserHistory.push('/profile/talent')
        }
        if(window.location.search!==''){
            let uID = window.location.search;
            uID = uID.slice(5)
            this.setState({uid:uID})
        }else{
            browserHistory.push('/signin/talent')
        }
    }

    getValue = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value})
        if (name === 'oldPassword') {
            this.setState({ isOldPassword: Validate.oldPasswordValidate(value)})
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
        if (this.state.uid!=='') {
            const { isOldPassword, isPassword, isConfirmPassword } = this.state
            this.setState({ isValidate: true })
            if(!isOldPassword || !isPassword || !isConfirmPassword) {
                return
            }
            this.setState({ isLoading: true })
            
            let bodyFormData = new FormData();
            bodyFormData.append('UserId',this.state.uid);
            bodyFormData.append('OldPassword',this.state.oldPassword);
            bodyFormData.append('newPassword',this.state.newPassword);
            axios({
                method: 'post',
                url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/ChangePassword',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then((response) => {
                    if(response.data.data[0].ret){
                        this.setState({ 
                            isError:false,
                            isSuccess:true,
                            isLoading: false,
                         });
                         setTimeout(function(){  browserHistory.push('signin/talent'); }, 3000);
                    }else{
                        this.setState({ 
                            isError:true,
                            errorText:response.data.data[0].message,
                            isSuccess:false,
                            isLoading: false,
                            isOldPassword:false
                            });
                    }
                }).catch((err) => {
                    this.setState({ 
                        isLoading: false,
                        isError:true,
                        isSuccess:false
                     });
                     
                });

        } 
        
    }

    render() {
        const { isOldPassword,isPassword, isConfirmPassword, isValidate, isLoading } = this.state;
        const newPasswordElement = (
            <Wrapper>
                <Form>
                    <MuiThemeProvider>
                        <TextField
                            name="oldPassword"
                            type="password"
                            onChange={this.getValue}
                            floatingLabelText="Old Password"
                            floatingLabelStyle={ isValidate && !isOldPassword ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                            floatingLabelShrinkStyle={ isValidate && !isOldPassword ? styles.focusStyle.error : styles.focusStyle.success }
                            underlineShow={false}
                            />              
                    </MuiThemeProvider> 
                    { isOldPassword && <Img src={Images.check} alt="checked"></Img> }
                    { isValidate && !isOldPassword && <Img src={Images.warnning} alt="warnning"></Img> }
                    { !isOldPassword && !isValidate && <Img empty></Img> } 
                </Form>
                { !isOldPassword && isValidate
                    ? <UnderLine error></UnderLine>
                    : <UnderLine></UnderLine>
                }
                <Form>
                    <MuiThemeProvider>
                        <TextField
                            name="newPassword"
                            type="password"
                            onChange={this.getValue}
                            floatingLabelText="New Password"
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
                         <Heading>Change Your Password</Heading>
                   
                    { isValidate && (!isPassword || !isConfirmPassword)
                        ? <Text>Please fill in required fields</Text>
                        : null
                    }
                    { this.state.isSuccess?
                    <p class="sc-jqCOkK" style={successStyle}>Password has been changed successfully!</p>
                    :null
                    }
                     { this.state.isError
                        ? <Text>{this.state.errorText}</Text>
                        : null
                    }
                    { this.props.error ? <Text>{this.props.error}</Text> : null }
                    {  newPasswordElement }
                    { isLoading ? <SpinWrapper><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></SpinWrapper> :
                        <ButtonWrapper signup>
                            {
                             !isValidate
                             || (isPassword && isConfirmPassword)
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
            ChangePassword,
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)