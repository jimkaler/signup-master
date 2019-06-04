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
import { GoogleLogin } from 'react-google-login';
import {LinkedIn as LinkedInLog } from 'react-linkedin-login-oauth2';
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
import axios from 'axios';
import Cookies from 'universal-cookie';
import $ from 'jquery'; 
const cookies = new Cookies();

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

const expires = new Date()
expires.setDate(expires.getDate() + 14)
const responseGoogle = (response) => {
    if(response.error){
        cookies.set('isLoggedIn', false, { path: '/' });
    }else{
        const expires = new Date()
        expires.setDate(expires.getDate() + 14)
        // console.log(response)
        let userInfo = {
            log:response.Zi.access_token,
            email:response.profileObj.email,
            firstName:response.profileObj.givenName,
            lastName:response.profileObj.familyName,
            image:response.profileObj.imageUrl,
            name:response.profileObj.name,
            id:response.Zi.access_token,
            location:''
        }
        userInfo = JSON.stringify(userInfo);
        userInfo = JSON.parse(userInfo);

        let bodyFormData = new FormData();
        bodyFormData.append('Name',response.profileObj.name);
        bodyFormData.append('Email',response.profileObj.email);
        bodyFormData.append('Token',response.Zi.access_token);
        let InveniasData = {
            "EmailAddresses": [
              {
                 "FieldName": "Email1Address",
                 "DisplayTitle": "Email",
                 "ItemValue": response.profileObj.email
              }
            ],
            "NameComponents": {
              "FullName": response.profileObj.name,
              "FamilyName": response.profileObj.familyName,
              "FirstName": response.profileObj.givenName,
              "Suffix": response.profileObj.familyName,
            }
          }
          cookies.set('userInfo',userInfo,{path:'/',expires:expires})
        axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/SocialMediaLogin',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                var userInfo = cookies.get('userInfo')
                userInfo.id = response.data.data[0].Id;
                cookies.set('userInfo',userInfo,{path:'/',expires:expires})
                if(response.data.data[0].InveniasId==null || response.data.data[0].InveniasId==''){
                    /* Get Access Token */
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://cors-anywhere.herokuapp.com/https://adveniopeople.invenias.com/identity/connect/token",
                        "method": "POST",
                        "headers": {
                        "cache-control": "no-cache",
                        },
                        "data": {
                        "username": "bjorn@adveniopeople.com",
                        "password": "Cyclops2+",
                        "client_id": "6dc6aa49-1278-438b-a429-cc711d2a2676",
                        "client_secret": "5aIu68liL3sZ1P5Ph+rFsQ8TL",
                        "grant_type": "password",
                        "scope": "openid profile api email"
                        }
                    }
                    $.ajax(settings).done(function (response) {
                    sessionStorage.setItem('AccessToken',response.access_token); 
                    SaveDataIntoInvenias()
                    })
                    .fail(function (jqXHR, textStatus) {
                        console.log(textStatus);
                    });
                    /* Get Access Token */
                }else{
                    cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                    browserHistory.push('/profile/talent/person');
                }    
            }).catch((err) => {
                console.log(err)
                
            });

            var Udata = cookies.get('userInfo');
                function SaveDataIntoInvenias(){
                    axios({
                        method: 'post',
                        url: 'https://cors-anywhere.herokuapp.com/https://adveniopeople.invenias.com/api/v1/people',
                        data: InveniasData,
                        async:true,
                        headers: {'Authorization':'Bearer '+sessionStorage.getItem('AccessToken') }
                        })
                        .then((response) => {
                            console.log(response)
                            UpdateDataToDB(response.data.Id)
                        }).catch((err) => {
                            console.log(err)
                        });
                    }

                    function UpdateDataToDB(InveniasId){
                        var userData = cookies.get('userInfo');
                        var newFormData = new FormData();
                        newFormData.append('UserId',userData.id);
                        newFormData.append('InveniasId',InveniasId);
                            axios({
                            method: 'post',
                            url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/UpdateInveniasIdByUserId',
                            data: newFormData,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                            })
                            .then((response) => {
                                    var userInfo = cookies.get('userInfo');
                                    userInfo.invenias_id = InveniasId;
                                    cookies.set('userInfo',userInfo,{path:'/',expires:expires})
                                    cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                                    browserHistory.push('/profile/talent/person');
                            }).catch((err) => {
                                console.log(err)
                            });

                    }


    }

        // console.log("Running Function "+cookies.get('isLoggedIn'));
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
        
        if(!cookies.get('isLoggedIn')){
            cookies.set('isLoggedIn',false,{path:'/'})
        }
        if(cookies.get('isLoggedIn')==='false'){
            // console.log("LoggedIn Not Define? "+cookies.get('isLoggedIn'))
              
           
        }else{
            // console.log("LoggedIn Enabled True? "+cookies.get('isLoggedIn'))
             browserHistory.push('/profile/talent/person');
        }

        cookies.set('authType', 'talent', { path: '/' },expires,expires);
    }

    componentDidMount() {
        if (!this.props.hasExternalLogins) {
           
            this.props.actions.getExternalLogins();
        }
        
    }

    getValue = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value})
        if(name === 'email'){
            this.setState({ isEmail: Validate.emailValidate(value)})
        }
        if(name === 'password'){
            this.setState({ isPassword: Validate.SignInpasswordValidate(value)})
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
        let bodyFormData = new FormData();
        bodyFormData.append('Email',this.state.email);
        bodyFormData.append('Password',this.state.password);
        axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/UserLogin',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                if(response.data.status==='1'){
                    console.log(response)
                    let name = response.data.data[0].Name.split(' ');
                    let fname = name[0];
                    let lname = name[1]; 
                    let userInfo = {
                        log:'',
                        email:response.data.data[0].Email,
                        firstName:fname,
                        lastName:lname,
                        image:'',
                        id:response.data.data[0].Id,
                        name:response.data.data[0].Name,
                        location:response.data.data[0].Location
                    }
                    console.log(userInfo);
                    this.setState({
                        isLoading:false 
                    })
                    cookies.set('userInfo',userInfo,{path:'/',expires:expires})
                    cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                    // console.log(cookies.get('isLoggedIn'));
                    browserHistory.push('/profile/talent/person');
                }else{
                    this.setState({
                        errorMessage: 'The user name or password is incorrect.',
                        isLoading:false 
                    })
                }
            }).catch((err) => {
                this.setState({ 
                    isLoading: false,
                    isError:true,
                    isSuccess:false
                 });
                 
            });
       
    }

    handleSignUp = () => {
        browserHistory.push('/signup/talent');
    }

    handleForgotPassword = () => {
        this.props.actions.reset()
        browserHistory.push('/get-password/talent');
    }

      handleSuccessLog = (data) => {
        // console.log(data.code)
        var redirect = window.location.origin+"/linkedin";
        // 2 Get Access Token
            axios({
                method: 'post',
                url: `https://cors-anywhere.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${data.code}&redirect_uri=${redirect}&client_id=8129i2daae37nq&client_secret=IdU7fiZp1Aii7AAG`,
                async:true
                })
                .then((response) => {
                    cookies.set('acT',response.data.access_token,{path:'/',expires:expires})
                    getLiteProfile(response.data.access_token);
                }).catch((err) => {
                    // console.log(err)
                    this.setState({
                        errorMessage: 'Something went wrong',
                        isLoading:false 
                    })
                     
                });
                // 3 Get LiteProfile

               function getLiteProfile(token){
                    axios({
                    method: 'GET',
                    url: `https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/me?projection=(firstName,lastName)
                    &oauth2_access_token=${token}`,
                    async:true
                    })
                    .then((response) => {
                        // console.log(response)
                        let localeCountry = response.data.firstName.preferredLocale.country;
                        let localeLang = response.data.firstName.preferredLocale.language;
                        let locale = localeLang+"_"+localeCountry;
                        let fn = response.data.firstName.localized[locale];
                        let ln = response.data.lastName.localized[locale]; 
                        cookies.set('LinkFN',fn,{path:'/',expires:expires});
                        cookies.set('LinkLN',ln,{path:'/',expires:expires});
                        cookies.set('LinkTN',cookies.get('acT'),{path:'/',expires:expires});
                        cookies.set('LinkID',cookies.get('acT'),{path:'/',expires:expires});
                          getEmail();

                    }).catch((err) => {
                        console.log(err)
                    });
                }
               // 4 Get Email address

              function getEmail(){ 
                axios({
                method: 'GET',
                url: `https://cors-anywhere.herokuapp.com/https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))&oauth2_access_token=${cookies.get('acT')}`,
                async:true
                })
                .then((response) => {
                    var json = JSON.parse(JSON.stringify(response.data).split('"handle~":').join('"email":'));
                  
                    let email = json.elements[0].email.emailAddress;
                  
                    let userInfo = {
                        log:cookies.get('LinkTN'),
                        email:email,
                        firstName:cookies.get('LinkFN'),
                        lastName:cookies.get('LinkLN'),
                        image:'',
                        id:cookies.get('LinkID'),
                        name:cookies.get('LinkFN')+" "+cookies.get('LinkLN'),
                        location:''
                    }
                    cookies.set('userInfo',userInfo,{path:'/',expires:expires})
                    cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                    registerUser(email)
                }).catch((err) => {
                    console.log(err)
                    // this.setState({
                    //     errorMessage: 'Something went wrong',
                    //     isLoading:false 
                    // })
                     
                });   
            }
            function registerUser(email){
        
                let bodyFormData = new FormData();
                bodyFormData.append('Name',cookies.get('LinkFN')+" "+cookies.get('LinkLN'));
                bodyFormData.append('Email',email);
                bodyFormData.append('Token',cookies.get('LinkTN'));
                axios({
                    method: 'post',
                    url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/SocialMediaLogin',
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then((response) => {
                        var uData = cookies.get('userInfo');
                        uData.id = response.data.data[0].Id;
                        if(response.data.data[0].Id=='' || response.data.data[0].Id==null){
                            cookies.set('userInfo',uData,{path:'/',expires:expires});
                            SaveDataIntoInvenias();
                        }else{
                            cookies.set('userInfo',uData,{path:'/',expires:expires});
                            cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                            browserHistory.push('/profile/talent/person');
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
            }

             /* Get Access Token */
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cors-anywhere.herokuapp.com/https://adveniopeople.invenias.com/identity/connect/token",
            "method": "POST",
            "headers": {
              "cache-control": "no-cache",
            },
            "data": {
              "username": "bjorn@adveniopeople.com",
              "password": "Cyclops2+",
              "client_id": "6dc6aa49-1278-438b-a429-cc711d2a2676",
              "client_secret": "5aIu68liL3sZ1P5Ph+rFsQ8TL",
              "grant_type": "password",
              "scope": "openid profile api email"
            }
          }
          $.ajax(settings).done(function (response) {
           sessionStorage.setItem('AccessToken',response.access_token); 
           SaveDataIntoInvenias()
          })
          .fail(function (jqXHR, textStatus) {
            console.log(textStatus);
        });
        /* Get Access Token */

        var uData = cookies.get('userInfo');
        var InveniasData = {
            "EmailAddresses": [
                {
                   "FieldName": "Email1Address",
                   "DisplayTitle": "Email",
                   "ItemValue": uData.email
                }
              ],
              "NameComponents": {
                "FullName": uData.firstName+" "+uData.lastName,
                "FamilyName": uData.lastName,
                "FirstName": uData.firstName,
                "Suffix": uData.lastName,
              }
        }
        function SaveDataIntoInvenias(){
            axios({
                method: 'post',
                url: 'https://cors-anywhere.herokuapp.com/https://adveniopeople.invenias.com/api/v1/people',
                data: InveniasData,
                async:true,
                headers: {'Authorization':'Bearer '+sessionStorage.getItem('AccessToken')  }
                })
                .then((response) => {
                    UpdateDataToDB(response.data.Id)
                }).catch((err) => {
                    console.log(err)
                });
        }
 
        function UpdateDataToDB(InveniasId){
            var userData = cookies.get('userInfo');
            var newFormData = new FormData();
            newFormData.append('UserId',userData.id);
            newFormData.append('InveniasId',InveniasId);
                axios({
                method: 'post',
                url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/UpdateInveniasIdByUserId',
                data: newFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                .then((response) => {
                        var userInfo = cookies.get('userInfo');
                        userInfo.invenias_id = InveniasId;
                        cookies.set('userInfo',userInfo,{path:'/',expires:expires})
                        cookies.set('isLoggedIn',true,{path:'/',expires:expires})
                        browserHistory.push('/profile/talent/person');
                }).catch((err) => {
                    console.log(err)
                });

               
      }
    }
    
      handleFailureLog = (error) => {
        // this.setState({
        //   code: '',
        //   errorMessage: error.errorMessage,
        // });
        console.log("LinkedIn Error ",error)
      }
    render() {
        const { isEmail, isPassword, isValidate, isLoading, errorMessage } = this.state             
        return (
            <Wrapper>                      
                <Header/>                       
                <Content>
                    <Heading>Sign in now</Heading>
                   
                    <ButtonWrapper>
                    {/* <LinkedinSDK
                        clientId="81rg1g83flx6m5"
                        callBack={this.responseLinkedin}
                        fields=":(id,num-connections,picture-urls::(original))"
                        className={'className'}
                        loginButtonText={'Login with Linkedin'}
                        logoutButtonText={'Logout from Linkedin'}
                        buttonType={'button'}                        
                        getOAuthToken
                    /> */}
                    {/* <LinkedinSDK
                        clientId="81rg1g83flx6m5"
                        callBack={responseLinkedin}
                        fields=":(id,num-connections,picture-urls::(original))"
                        className={'className'}
                        loginButtonText={'Login with Linkedin'}
                        logoutButtonText={'Logout from Linkedin'}
                        buttonType={'button'}
                        getOAuthToken
                    /> */}
                    <div className="sc-jbKcbu gnyyqT">
                        <GoogleLogin
                            clientId={urls.GOOGLE_KEY}
                            onSuccess={responseGoogle}
                            render={renderProps => (
                                <div onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ display:"inline-flex" }}>
                                    <img src="/assets/svgs/google-icon.svg" alt="google"/>
                                    <p>Sign up with Google</p>
                                </div>
                                
                              )}
                            // redirectUri={window.location.origin}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            // isSignedIn={'false'}
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
                     <LinkedInLog
                        clientId={urls.LINKEDIN_KEY}
                        onFailure={this.handleFailureLog}
                        onSuccess={this.handleSuccessLog}
                        redirectUri={`${window.location.origin}/linkedin`}
                        scope="r_liteprofile r_emailaddress"
                        LinkedinPopUp
                        >
                        Sign up With LinkedIn
                    </LinkedInLog>
                     </div>
                     
                    {/* { this.props.hasExternalLogins && this.props.externalLogins['google'] && */}
                        <SocialButton style={{ display:"none" }} google onClick={() =>this.handleSocialLogin('google')}>
                            <img src={Images.google} alt="google" />
                            <p>Sign in with Google</p>
                        </SocialButton> 
                        {/* } */}
                    {/* { this.props.hasExternalLogins && this.props.externalLogins['facebook'] &&
                        <SocialButton onClick={() =>this.handleSocialLogin('facebook')}>
                            <img src={Images.facebook1} alt="facebook" />
                            <p>Sign in with Facebook</p>
                        </SocialButton> } */}
                    </ButtonWrapper>
                    { this.props.hasExternalLogins && 
                    <CircleButton>Or</CircleButton> 
                    }
                    {    isValidate && (!isEmail || !isPassword ) ?
                        <Text>Please fill in required fields</Text> : null
                    }         
                     { errorMessage ? <Text>{errorMessage}</Text> : null }           
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