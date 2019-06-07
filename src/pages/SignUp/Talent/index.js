import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import ReactLoading from 'react-loading'
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
    SignUpButton } from './Style'
import Images from '../../../themes/images'
import * as urls from '../../../constants/urls'
import * as config from '../../../constants/config'
import { signUpRequest, signInRequest, getExternalLogins, startExternalLogin } from '../../../actions/auth'
import { reset } from '../../../reducers'
import * as Validate from '../../../constants/validate'
import { GoogleLogin } from 'react-google-login';
import Cookies from 'universal-cookie';
import axios from 'axios';
import $ from 'jquery'; 
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
            id:response.Zi.access_token,
            location:''
        }
        userInfo = JSON.stringify(userInfo);
        userInfo = JSON.parse(userInfo);
        // console.log(userInfo);
        cookies.set('userInfo', userInfo, { path: '/' });
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
    
                axios({
                    method: 'post',
                    url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/SocialMediaLogin',
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then((response) => {
                        console.log(response)
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

        console.log(cookies.get('userInfo'));
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
            profileLink:'',
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

        if(!cookies.get('isLoggedIn')){
            cookies.set('isLoggedIn',false,{path:'/'})
        }
        if(cookies.get('isLoggedIn')==='false'){
            console.log("LoggedIn Not Define? "+cookies.get('isLoggedIn'))
              
           
        }else{
            console.log("LoggedIn Enabled True? "+cookies.get('isLoggedIn'))
             browserHistory.push('/profile/talent/person');
        }

        cookies.set('authType', 'talent', { path: '/' ,expires:expires});
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
        
        this.props.actions.reset()   

        let bodyFormData = new FormData();
        bodyFormData.append('Name',this.state.fullName);
        bodyFormData.append('Email',this.state.email);
        bodyFormData.append('Token',token());
        bodyFormData.append('transactionId',trans());
        bodyFormData.append('city',this.state.city);
        bodyFormData.append('socialLink',this.state.profileLink);
        bodyFormData.append('passwordUrl',window.location.origin+"/talent-change-password");
        var name = this.state.fullName;
        name = name.split(' ');
        var fname = name[0];
        var lname = name[1];
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

                      $.ajax({
                        async: true,
                        crossDomain: true,
                        url: "https://cors-anywhere.herokuapp.com/https://adveniopeople.invenias.com/identity/connect/token",
                        method: "POST",
                        headers: {
                            "cache-control": "no-cache",
                        },
                        data: {
                            "username": "bjorn@adveniopeople.com",
                            "password": "Cyclops2+",
                            "client_id": "6dc6aa49-1278-438b-a429-cc711d2a2676",
                            "client_secret": "5aIu68liL3sZ1P5Ph+rFsQ8TL",
                            "grant_type": "password",
                            "scope": "openid profile api email"
                        },success:function (response) {
                            sessionStorage.setItem('AccessToken',response.access_token); 
                            // SaveDataIntoInvenias()

                            axios({
                                method: 'post',
                                url: 'https://cors-anywhere.herokuapp.com/https://adveniopeople.invenias.com/api/v1/people',
                                data: InveniasData,
                                async:true,
                                headers: {'Authorization':'Bearer '+sessionStorage.getItem('AccessToken')  }
                                })
                                .then((response) => {
                                    // SaveDataIntoDb(response.data.Id)
                                    var invId = response.data.Id;

                                    axios({
                                        method: 'post',
                                        url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/UserRegistration',
                                        data: bodyFormData,
                                        async:true,
                                        config: { headers: {'Content-Type': 'multipart/form-data' }}
                                        })
                                        .then((response) => {
                                            console.log(response.data.data[0])
                                            if(response.data.data[0].ret===1){
                                                // UpdateDataToDB(response.data.data[0].UserId,InveniasId);
                                                var userData = cookies.get('userInfo');
                                                var newFormData = new FormData();
                                                newFormData.append('UserId',response.data.data[0].UserId);
                                                newFormData.append('InveniasId',invId);
                                                    axios({
                                                    method: 'post',
                                                    url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/UpdateInveniasIdByUserId',
                                                    data: newFormData,
                                                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                                                    })
                                                    .then((response) => {
                                                        this.setState({ 
                                                            isLoading: false,
                                                            isError:false,
                                                            isSuccess:true
                                                        });
                                                    }).catch((err) => {
                                                        console.log(err)
                                                    });

                                                
                                            }else{
                                                this.setState({ 
                                                    isLoading: false,
                                                    errorMessage:response.data.data[0].message,
                                                    isSuccess:false
                                                });
                                            }
                                        }).catch((err) => {
                                            this.setState({ 
                                                isLoading: false,
                                                isError:true,
                                                isSuccess:false
                                            });
                                            
                                        });

                                }).catch((err) => {
                                    console.log(err)
                                });

                          }.bind(this),error: function(err){
                              console.log(err)
                          }.bind(this)
                      })
                      .fail(function (jqXHR, textStatus) {
                        console.log(textStatus);
                    });
                    /* Get Access Token */
            
                    var InveniasData = {
                        "EmailAddresses": [
                            {
                               "FieldName": "Email1Address",
                               "DisplayTitle": "Email",
                               "ItemValue": this.state.email
                            }
                          ],
                          "NameComponents": {
                            "FullName": this.state.fullName,
                            "FamilyName": lname,
                            "FirstName": fname,
                            "Suffix": lname,
                          }
                    }

    }

    handleSocialLogin = (social) => {
        const externalLoginUrl = urls.API_HOST + this.props.externalLogins[social].url;
        this.props.actions.startExternalLogin(externalLoginUrl);
        window.location.href = externalLoginUrl;
    }

    handleSuccessLog = (data) => {
        // console.log(data.code)
        var redirect = window.location.origin+"/linkedin";
        // 2 Get Access Token
            axios({
                method: 'post',
                url: `https://cors-anywhere.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${data.code}&redirect_uri=${redirect}&client_id=8129i2daae37nq&client_secret=IdU7fiZp1Aii7AAG`,
                })
                .then((response) => {
                        cookies.set('acT',response.data.access_token,{path:'/',expires:expires})
                        getLiteProfile(response.data.access_token);
                }).catch((err) => {
                    console.log(err)
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
                    &oauth2_access_token=${token}`
                    })
                    .then((response) => {
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
                   
                    registerUser(email)
                }).catch((err) => {
                    console.log(err)
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
                            getToken();
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
        function getToken(){    
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
    }
        /* Get Access Token */

       
        function SaveDataIntoInvenias(){
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
                  },
                  "HomeAddress": {
                    "TownCity": "Jalandhar",
                  }
            }
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
        console.log("LinkedIn Error ",error)
      }
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