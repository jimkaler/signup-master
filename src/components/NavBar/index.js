import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isMobile } from 'react-device-detect';

import Model from '../Model'
import { 
    Wrapper,
    ModelWrapper,
    // SaveButton, 
    EditButton,
    Img, 
    Nav, 
    Menu,
    MobileMenu, 
    LoginButton,
    MobileLoginButton } from './Style'
import Images from '../../themes/images'
import { getEditState } from '../../actions/auth'
import { reset } from '../../reducers'
import { disableScrolling, enableScrolling } from '../../jquery';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Navigation extends Component {
    constructor() {
        super()
        this.state = {
            isActive: false,
            isHover: false,
            switched: false,            
        }      
    }
    
    scrollingOnMobile = () => {        
        if(this.state.isActive){
            enableScrolling('mobile')
        } 
        else {       
            disableScrolling('mobile')
        }
    }

    toggleNavigation = () => {
        this.setState({
            isActive: !this.state.isActive
        })  
        if(!this.state.isActive){
            disableScrolling('desktop')                  
        } else {
            enableScrolling('desktop')            
        }        
        this.scrollingOnMobile()
    }
    
    navigationPage = (path) => {
        this.setState({
            isActive: !this.state.isActive
        })
        enableScrolling('desktop')      
        enableScrolling('mobile')
        browserHistory.push(path)
    } 
    
    toggleEdit = () => {
        let isEditable = this.props.isEditable ? false : true        
        this.props.actions.getEditState(isEditable);
    }

    toggleAction = () => {
        // if(cookies.get('authType')==='talent'){
        //     if(cookies.get('isLoggedIn')){
        //         if(this.state.isActive){
        //                 this.setState({
        //                     isActive: false
        //                 })
        //                 this.scrollingOnMobile()
        //                 enableScrolling('desktop')      
        //             }         
        //         } else {
        //             if(this.state.isActive){
        //                 this.setState({
        //                     isActive: false
        //                 })
        //                 this.scrollingOnMobile()
        //                 enableScrolling('desktop')      
        //             }
        //     }
        //     browserHistory.push('/signin/talent')
        // }else{
        //     browserHistory.push('/signup/employer')
        // }
        if(this.props.type === 'talent'){
            if(cookies.get('isLoggedIn')){                
                this.props.actions.reset()   
                if(this.state.isActive){
                    this.setState({
                        isActive: false
                    })
                    this.scrollingOnMobile()
                    enableScrolling('desktop')      
                }         
            } else {
                if(this.state.isActive){
                    this.setState({
                        isActive: false
                    })
                    this.scrollingOnMobile()
                    enableScrolling('desktop')      
                }
            }            
            browserHistory.push('/signin/talent')
        } else {
            browserHistory.push('/signup/employer')
        }
    }

    menu = () => {
        const { save, edit } = this.props
        if(isMobile){
            return (
                <MobileMenu save={save} edit={edit} onClick={this.toggleNavigation}>                        
                    <img src={Images.hambugerButton} alt="menu"/>                    
                </MobileMenu>
            )                 
        } else
            return (
                <Menu save={save} edit={edit} onClick={this.toggleNavigation}>                        
                    <img src={Images.hambugerButton} alt="menu"/>
                    <img src={Images.hoverMenu} alt="hover_menu"/>
                </Menu>
            )
    }
    logout = () => {
        cookies.set('isLoggedIn',false, {path:'/'})
        browserHistory.push('/signin/talent')
        console.log("Logout Button "+cookies.get('isLoggedIn'))
    }
    loginButton = () => {
        const { save, edit } = this.props
        if(isMobile){
            return (
                <MobileLoginButton save={save} edit={edit} onClick={() =>this.toggleAction()}>
                    <img src={Images.login} alt="login"/>                                                                       
                </MobileLoginButton>
            )
        } else 
            return (
                <LoginButton save={save} edit={edit} onClick={() =>this.toggleAction()}>
                    <img src={Images.login} alt="login"/>
                    <img src={Images.loginHover} alt="hover_login"/>                                                  
                </LoginButton>
            )
    }
    logoutButton = () => {
        const { save, edit } = this.props
        if(isMobile){
            return (
                <MobileLoginButton save={save} edit={edit} onClick={() =>this.logout()}>
                    <img src={Images.logout} alt="login"/>                                                                       
                </MobileLoginButton>
            )
        } else 
            return (
                <LoginButton save={save} edit={edit} onClick={() =>this.logout()}>
                    <img src={Images.logout} alt="logout"/>
                    <img src={Images.logoutHover} alt="hover_logout"/>                                                   
                </LoginButton>
            )
    }
    render() {
        const { landing, edit, type, isEditable } = this.props
        return (
            <Wrapper>
                <ModelWrapper landing={landing}>
                    <Model />
                </ModelWrapper>
                {/* <SaveButton save={save}>Save for later</SaveButton> */}
                <EditButton flag={isEditable} edit={edit} onClick={() =>this.toggleEdit()}>
                    { isEditable ? 'Save' : 'Edit profile' }
                </EditButton>
                { !this.state.isActive ? 
                    this.menu()
                    :  <Img onClick={this.toggleNavigation} src={Images.xButton} alt=""/>
                }                                             
                <Nav className={this.state.isActive ? "active" : ""} >
                    <li><a onClick={() => this.navigationPage('/home')}>Home</a></li>
                    <li>
                        { type === 'talent' ?
                            <a onClick={() => this.navigationPage('/profile/talent/candidate')}>My Profile</a> : <a onClick={() => this.navigationPage('/profile/employer')}>My Profile</a>
                        }                        
                    </li>
                    <li><a onClick={() => this.navigationPage('/about')}>About</a></li>
                    <li><a onClick={() => this.navigationPage('/contact')}>Contact</a></li>
                    <li><a onClick={() => this.navigationPage('/privacy')}>Privacy and GDPR</a></li>
                    <li><a onClick={() => this.navigationPage('/faq')}>FAQ</a></li>
                    <li><a onClick={() => window.location.assign('https://www.linkedin.com/company/agentify/')}>LinkedIn</a></li>
                    <li><a onClick={() => window.location.assign('https://www.facebook.com/agentify.me/')}>Facebook</a></li>
                </Nav>
                {cookies.get('isLoggedIn')==='true'?
                this.logoutButton():                            
                 this.loginButton()     
                }  
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {
        type: state.auth.type,
        isLoggedIn: state.auth.isLoggedIn,
        isEditable: state.auth.isEditable
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getEditState, reset
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)