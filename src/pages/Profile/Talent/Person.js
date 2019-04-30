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
    CircleButton, 
    Text, 
    Form, 
    UnderLine, 
    Img, 
    NextButton } from './PersonStyle'
import Images from '../../../themes/images'
import { postSignup1Data } from '../../../actions/talent'
import { reset } from '../../../reducers'
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

class Person extends Component {
    constructor(props){
        super(props)  
        this.state = {
            isValidate: false,
            isFullName: false,
            isLocation: false,
            isLoading: false
        }
    }

    componentDidMount () {
        console.log('Profile:Talent:Person:componentDidMount:props:', this.props);
        this.setState({ fullName: this.props.fullName });
        this.setState({ isFullName: Validate.fullnameValidate(this.props.fullName) })
        this.setState({ location: this.props.location });
        this.setState({ isLocation: Validate.placeValidate(this.props.location) })
    }

    getValue = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value})
        if(name === 'fullName'){
            this.setState({ isFullName: Validate.fullnameValidate(value)})
        }
        if(name === 'location'){
            this.setState({ isLocation: Validate.placeValidate(value)})
        }
        e.preventDefault()
    }

    handleSignUp = () => {                       
        const { isFullName, isLocation } = this.state
        this.setState({ isValidate: true })
        if(!isFullName || !isLocation ){
            return
        }
        this.setState({ isLoading: true })
        const obj = {
            FirstName: this.state.fullName.split(' ')[0],
            LastName: this.state.fullName.split(' ')[1],
            Location: this.state.location
        }
        const headers = { Authorization: this.props.header };
        this.props.actions.postSignup1Data('Profile/Signup1', obj, headers)
            .then(() => {
                this.setState({ isLoading: false });
                browserHistory.push('/profile/talent/category');
            })
            .catch(() => {
                this.setState({ isLoading: false })
            })               
    }

    render() {
        const { isFullName, isLocation, isValidate, isLoading } = this.state             
        return (
            <Wrapper>                      
                <Header visible percent={1}/>                       
                <Content>
                    <Heading>Specify your Name and Location</Heading>
                    { isValidate && (!isFullName || !isLocation ) ?
                        <Text>Please fill in required fields</Text> : null
                    }                    
                    <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="fullName"
                                onChange={this.getValue}
                                floatingLabelText="Full Name"
                                floatingLabelStyle={ isValidate && !isFullName ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isFullName ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                value={this.state.fullName}
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
                                name="location"
                                onChange={this.getValue}
                                floatingLabelText="Where do you live?"
                                floatingLabelStyle={ isValidate && !isLocation ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isLocation ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                value={this.state.location}
                                />              
                        </MuiThemeProvider> 
                        { isLocation && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isLocation && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isLocation && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isLocation && isValidate ?
                        <UnderLine error></UnderLine> : <UnderLine></UnderLine>
                    }
                    { isLoading ? <SpinWrapper><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></SpinWrapper> :
                        <ButtonWrapper signup>
                            { !isValidate || (isFullName && isLocation) ?
                                <NextButton active onClick={this.handleSignUp}>Next</NextButton> :
                                <NextButton onClick={this.handleSignUp}>Next</NextButton>
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
        header: state.auth.header,
        fullName: state.talent.fullName,
        location: state.talent.location
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            postSignup1Data, reset
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(Person)