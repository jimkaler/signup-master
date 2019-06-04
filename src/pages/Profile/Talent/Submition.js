import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Switch from 'react-toggle-switch'
import "../../../../node_modules/react-toggle-switch/dist/css/switch.min.css"
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactLoading from 'react-loading'
import AlertContainer from 'react-alert'

import Header from '../../../components/Header'
import TagList from '../../../components/TagList'
import Images from '../../../themes/images'
import { 
    Wrapper,
    Content,
    FieldWrapper, 
    ButtonWrapper,
    Button,
    Input,
    AutoSuggest, 
    Heading, 
    SubHeading, 
    TagWrapper, 
    Img, 
    Navigation,
    PrevButton, 
    NavigationButton, 
    UnderLine,
    TextFieldWrapper,
    FlexWrapper,
    AddButton,
    IconWrapper,
    SocialImg,
    ToggleWrapper } from './Style'
import { getSubmitionData, postSubmitionData,storeUserProfile } from '../../../actions/talent'
import * as Validate from '../../../constants/validate'
import { cities } from '../../../constants/data'
import { autoScrolling } from '../../../jquery';
import * as urls from '../../../constants/urls'
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();
const expires = new Date()
expires.setDate(expires.getDate() + 14)
const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {                
        display: 'none'
    }
}

class Submition extends Component {
    constructor(props){
        super(props)
        this.state = {
            location: '',
            locations: this.props.locations,
            beverage: this.props.beverage,
            status: this.props.status,
            urls: this.props.social,
            url: '',
            isValidate: false,
            isLoading: false,      
            google: false,
            facebook: false,
            linkedin: false,
            behance: false,
            git: false,
            isHighlight: false,
            switched: false,
            enableAdd: false,
            firstName:'',
            lastName:'',
            socialLink:'',

        }
    }
    
    componentWillMount() {
        console.log(this.props)
        if(!cookies.get('isLoggedIn')){
            browserHistory.push('/signin/talent');
        }
        autoScrolling()
        let socialType        
        if(this.props.social){
            this.props.social.map(url => {
                if(url.indexOf('github') !== -1) socialType = 'git'
                if(url.indexOf('google') !== -1) socialType = 'google'
                if(url.indexOf('facebook') !== -1) socialType = 'facebook'
                if(url.indexOf('linkedin') !== -1) socialType = 'linkedin'
                if(url.indexOf('behance') !== -1) socialType = 'behance'                
                this.setState({
                    [socialType]: true
                })
                return socialType
            })         
                
        }        
    }

    addTag = (text) => {      
        text = text.replace(/[\W_]+/g," "); 
        let temp = this.state.locations.slice()
        temp.push(text)
        this.setState({ locations: temp })        
    }

    removeTag = (index) => {
        let temp = this.state.locations.slice()
        temp.splice(index, 1)
        this.setState({ locations: temp })
    }

    getBeverage = (beverage) => {        
        this.setState({
            beverage: beverage
        })
    }

    getStatus = (num) => {        
        this.setState({
            status: num
        })
    }

    getText = (e) => {               
        const { location } = this.state
        if(e.target.value.length >= 2){            
            this.setState({ location: e.target.value })
        } 
        if(e.keyCode === 8 && e.target.value.length < 5){            
            this.setState({ location: '', isHighlight: false })
        }          
        if(e.keyCode === 13 && e.target.value) {                        
            this.addTag(e.target.value)  
            this.setState({ location: '', enableAdd: false, isHighlight: false })
            e.target.value = ''              
        }
        if(e.keyCode === 40 && location.length >= 3){            
            cities.map(city => {
                if(city.toLowerCase().indexOf(location.toLowerCase()) !== -1){
                    e.target.value = city
                }
                return true
            })
            this.setState({ isHighlight: true, place: e.target.value })
        }        
    }

    changeTarget = () => {
        cities.map(city => {
            if(city.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1){
                this.tagInput.input.value = city
            }
            return true
        })
        this.setState({
            isHighlight: false,
            location: ''
        })
    }

    getPlace = (e) => {
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        e.target.value.length > 1 ? this.setState({ enableAdd: true, place: e.target.value }) : this.setState({ enableAdd: false, place: e.target.value })
        format.test(e.target.value) ? this.setState({ enableAdd: false, place: e.target.value }) : this.setState({ enableAdd: true, place: e.target.value })
        // e.target.value.indexOf(',') === -1 ? this.setState({ enableAdd: true, place: e.target.value }) : this.setState({ enableAdd: false, place: e.target.value })
    }

    addLocation = () => {
        this.addTag(this.state.place)
        this.setState({ location: '', enableAdd: false, isHighlight: false })
        this.tagInput.input.value = ''
        this.tagInput.focus()
    }

    getUrl = (e) => {      
        const { value } = e.target          
        this.setState({
            isValidate: Validate.socialValidate(value),
            url: value
        })
    }

    addUrl = () => {
        let socialType
        const { url, urls } = this.state
        let temp = urls.slice()
        temp.push(url)
        temp.map(url => {
            if(url.indexOf('github') !== -1) socialType = 'git'
            if(url.indexOf('google') !== -1) socialType = 'google'
            if(url.indexOf('facebook') !== -1) socialType = 'facebook'
            if(url.indexOf('linkedin') !== -1) socialType = 'linkedin'
            if(url.indexOf('behance') !== -1) socialType = 'behance'
            this.setState({
                [socialType]: true
            })
            return socialType
        })         
        this.setState({
            urls: temp,
            isValidate: false,            
        })        
        this.urlInput.input.value = 'https://'
        this.urlInput.focus()
    }

    toggleSwitch = () => {               
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            }
        })
    }

    prevPageNavigation = (path) => {
        browserHistory.push(path)
    }

    nextPageNavigation = (path) => {
        const obj = { 
            ProfileId: this.props.profileId,           
            Locations: this.state.locations,
            Beverage: this.state.beverage,
            Social: this.state.urls,
            Status: this.state.status
        }
        
        if(this.state.locations.length<1 || this.state.locations<1 || this.state.beverage==='' || this.state.urls<1 || this.state.status===''){
            this.showAlert();
        }else{
            let stateValue= '';
            switch(this.state.status){
                case 0:
                stateValue = "Active" 
                break;
                case 1:
                stateValue = "Pasive"
                break;
                case 2: 
                stateValue = "It's complicated"
                break;
                case 3:
                stateValue = "Undecided"  
            }
            var firstForm = cookies.get('firstForm');
            var userInfo = cookies.get('userInfo');
            var initialForm = cookies.get('initialForm');

            const dataValue = { 
                FirstName: initialForm.firstName,
                LastName: initialForm.lastName,
                Location: initialForm.location,
                Email: userInfo.email,
                ProfileId: userInfo.id,
                Roles:firstForm.Roles,
                SubRoles:firstForm.SubRoles,
                Technologies:firstForm.Technologies,           
                PrefLocations: this.state.locations,
                Beverage: this.state.beverage,
                Social: this.state.urls,
                Status: stateValue
            }
            console.log(dataValue)
            cookies.set('completeData',dataValue,{path:'/'})

             /* API request start*/
             let bodyFormData = new FormData();
                bodyFormData.append('UserId',userInfo.id);
                bodyFormData.append('UserName',initialForm.firstName+' '+initialForm.lastName);
                bodyFormData.append('Beverage',this.state.beverage);
                bodyFormData.append('Location',initialForm.location);
                bodyFormData.append('PreferredLocations',this.state.locations);
                bodyFormData.append('Roles',firstForm.Roles);
                bodyFormData.append('SocialLinks',this.state.urls);            
                bodyFormData.append('SubRoles',firstForm.SubRoles);
                bodyFormData.append('Technologies',firstForm.Technologies);
                bodyFormData.append('Skypename','');
                bodyFormData.append('Phone','');
                axios({
                    method: 'post',
                    url: 'https://cors-anywhere.herokuapp.com/'+urls.API_HOST+'/UserUpdateProfile',
                    data: bodyFormData,
                    async:true,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then((response) => {
                        let data = {
                            id:userInfo.id,
                            fullName:initialForm.firstName+' '+initialForm.lastName,
                            email:userInfo.email,
                            location:initialForm.location,
                            locations:this.state.locations,
                            roles:firstForm.Roles,
                            technologies:firstForm.Technologies,
                            subRoles:firstForm.SubRoles,
                            beverage:this.state.beverage,
                            socialMedia:this.state.urls,
                            jobSeekingStatus:"active",
                        }
                        this.props.actions.storeUserProfile(data,"STORE_USER_PROFILE")
                        if(response.data.data[0].ret==true){
                            // browserHistory.push('/profile/talent/candidate');
                        }
                    }).catch((err) => {
                        console.log(err)                       
                    });
             /* API Request End */    


            /* Invenias request start*/
            // let bodyFormData = new FormData();
            // axios({
            //     method: 'post',
            //     url: 'https://cors-anywhere.herokuapp.com/'+urls.INVENIAS_HOST+'/api/v1/people',
            //     data: bodyFormData,
            //     async:true,
            //     config: { headers: {'Content-Type': 'multipart/form-data' }}
            //     })
            //     .then((response) => {
            //             userInfo.id = response.data.data[0].Id;
            //             cookies.set('userInfo',userInfo,{path:'/',expires:expires})
            //             cookies.set('isLoggedIn',true,{path:'/',expires:expires})
            //             browserHistory.push('/profile/talent/person');
            //     }).catch((err) => {
            //         console.log(err)
                                        
            //     });
            /* Invenias Request End */    
        }
        // this.setState({ isLoading: true })        
        // const headers = { Authorization: this.props.header };
        // browserHistory.push('/profile/talent/candidate');
        // !this.props.isCompleted ? this.props.actions.postSubmitionData('Profile/Signup3', obj, headers)
        //     .then(() => {      
        //         this.props.actions.getSubmitionData(obj)          
        //         setTimeout(() => {
        //             browserHistory.push(path)
        //         },2000)   
        //     }).catch(() => {
        //         this.setState({ isLoading: false });
        //         this.showAlert();
        //     }) : browserHistory.push(path)
    }

    alertOptions = {
        offset: 14,
        position: 'bottom right',
        theme: 'light',
        time: 0,
        transition: 'scale'
    }
     
    showAlert = () => {
        // browserHistory.push('/profile/talent/candidate');
        this.msg.info('Please fill out all fields.', {
            time: 0,
            type: 'info',
        })
    }

    gotoPage = (path) => {
        browserHistory.push(path);
        autoScrolling()
    }

    render() {        
        const { locations, beverage, status, isValidate, isLoading, location, place } = this.state                             
        return (
            <Wrapper>
                <Header visible percent={3} save/>
                <Content>
                    <Heading>Almost there...</Heading>
                    <FieldWrapper>
                        <SubHeading>Where would you like to work?</SubHeading> 
                        <FlexWrapper place>
                            <TextFieldWrapper place>
                                <Input>
                                    <MuiThemeProvider>
                                        <TextField   
                                            ref={(input) => {this.tagInput = input}} 
                                            onKeyDown={this.getText}
                                            onChange={this.getPlace} 
                                            onBlur={this.blur}                                                      
                                            floatingLabelText="Type city"
                                            floatingLabelStyle={styles.floatingLabelStyle}  
                                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                                            underlineShow={false}
                                        />              
                                    </MuiThemeProvider>                         
                                </Input>                                            
                                <UnderLine></UnderLine>
                            </TextFieldWrapper>
                        { this.state.enableAdd ? <AddButton active onClick={() => this.addLocation(place)}>Add</AddButton> : <AddButton >Add</AddButton> } 
                        </FlexWrapper>
                        <AutoSuggest active={this.state.isHighlight} onClick={() =>this.changeTarget()}> 
                        { location.length >= 3 && cities.map((city, index) => {     
                            let temp                       
                            if(city.toLowerCase().indexOf(location.toLowerCase()) !== -1 ){
                                temp = <p key={index}>{ city }</p>
                            }
                            return temp
                        })}         
                        </AutoSuggest>           
                    </FieldWrapper>
                    <TagWrapper>
                        <TagList data={ locations } removeTag={(index) => this.removeTag(index)} />
                    </TagWrapper>
                    <FieldWrapper>
                        <SubHeading>What is your preffered coffee?</SubHeading>                        
                        <ButtonWrapper>
                            <Button active={beverage === 'Espresso'} onClick={() => this.getBeverage('Espresso')}>Espresso</Button>
                            <Button active={beverage === 'Cappucino'} onClick={() => this.getBeverage('Cappucino')}>Cappucino</Button>
                            <Button active={beverage === 'Flat white'} onClick={() => this.getBeverage('Flat white')}>Flat white</Button>                                
                            <Button active={beverage === 'Cortado'} onClick={() => this.getBeverage('Cortado')}>Cortado</Button>
                            <Button active={beverage === 'Caffe latte'} onClick={() => this.getBeverage('Caffe latte')}>Caffe latte</Button>
                            <Button active={beverage === 'Macchiato'} onClick={() => this.getBeverage('Macchiato')}>Macchiato</Button>                 
                            <Button active={beverage === 'Tea'} onClick={() => this.getBeverage('Tea')}>Tea</Button>                 
                            <Button active={beverage === 'Undecided'} onClick={() => this.getBeverage('Undecided')}>Undecided<img src={Images.remove} alt="" /></Button>                 
                        </ButtonWrapper>
                    </FieldWrapper>
                    <FieldWrapper>
                        <SubHeading>Please help us understand your profile</SubHeading>                                                                                     
                        <IconWrapper>
                            <SocialImg git={this.state.git} src={Images.github} alt="github" />
                            <SocialImg google={this.state.google} src={Images.google1} alt="google" />
                            <SocialImg facebook={this.state.facebook} src={Images.facebook} alt="facebook" />
                            <SocialImg linkedin={this.state.linkedin} src={Images.linkedin} alt="linkedin" />
                            <SocialImg behance={this.state.behance} src={Images.behance} alt="behance" />
                        </IconWrapper>                                                                                                         
                        <FlexWrapper>
                            <TextFieldWrapper>    
                                <Input>
                                    <MuiThemeProvider>
                                        <TextField      
                                            ref={ (input) => {this.urlInput = input;}}                                    
                                            onChange={this.getUrl}                                                       
                                            floatingLabelText="https://"
                                            floatingLabelStyle={styles.floatingLabelStyle}  
                                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                                            underlineShow={false}
                                        />              
                                    </MuiThemeProvider>                         
                                </Input>                                            
                                <UnderLine></UnderLine> 
                            </TextFieldWrapper>
                            { isValidate ? <AddButton active onClick={this.addUrl}>Add</AddButton> : <AddButton >Add</AddButton> }                            
                        </FlexWrapper>                     
                    </FieldWrapper>
                    <FieldWrapper>
                        <SubHeading>What's your current status?</SubHeading>                        
                        <ButtonWrapper>
                            <Button active={status === 0} onClick={() => this.getStatus(0)}>Active</Button>
                            <Button active={status === 1} onClick={() => this.getStatus(1)}>Passive</Button>
                            <Button active={status === 2} onClick={() => this.getStatus(2)}>It's complicated</Button>                                                                                                                
                            <Button active={status === 3} onClick={() => this.getStatus(3)}>Undecided<img src={Images.remove} alt="" /></Button>                    
                        </ButtonWrapper>
                    </FieldWrapper>
                    <FieldWrapper>
                        <SubHeading>I accept Agentifys <span onClick={() =>this.gotoPage('/tca')} style={{color: '#79cc90'}}>terms and conditions</span></SubHeading>
                        <ToggleWrapper>
                            <p>Yes</p>                            
                                <Switch onClick={this.toggleSwitch} on={this.state.switched}/>                            
                            <p>No</p>
                        </ToggleWrapper>
                    </FieldWrapper>
                    { isLoading ? <Navigation><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></Navigation> :
                        <Navigation>
                            <PrevButton prev onClick={() => this.prevPageNavigation('/profile/talent/category')}><Img src={Images.leftArrow} alt="left" /></PrevButton>
                            { !this.state.switched ?
                                <NavigationButton onClick={() => this.nextPageNavigation('/profile/talent/candidate')}>Submit<Img right src={Images.wRightArrow} alt="right" /></NavigationButton>
                                : <NavigationButton inactive>Submit<Img right src={Images.wRightArrow} alt="right" /></NavigationButton>
                            }
                        </Navigation>
                    }
                </Content>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    const { profileId, locations, beverage, status, social, isCompleted } = state.talent
    return {        
        profileId, locations, beverage, status, social, isCompleted,
        header: state.auth.header
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getSubmitionData,
            postSubmitionData,
            storeUserProfile
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submition)