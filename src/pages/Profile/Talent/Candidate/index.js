import React, { Component } from 'react'
import Switch from 'react-toggle-switch'
import "../../../../../node_modules/react-toggle-switch/dist/css/switch.min.css" 
import InputRange from 'react-input-range';
import "../../../../../node_modules/react-input-range/lib/css/index.css";
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import ReactLoading from 'react-loading'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CircularProgressbar from '../../../../components/CircularProgressbar'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import Tags from '../../../../components/Tags'
import { updateStatus, updateCategory, getUserProfile, updateProfileInfo } from '../../../../actions/talent'
import { reset } from '../../../../reducers'
import { 
    Wrapper,
    Heading,
    UserWrapper,
    Avatar,
    User,
    ToggleWrapper,
    DetailWrapper,
    CircleWrapper,
    BgCircle,
    Detail,
    TagWrapper,
    FieldWrapper,
    Slider,
    Info,
    Contact } from './Style'
import Images from '../../../../themes/images'
import { autoScrolling } from '../../../../jquery';

class TagList extends Component {
    constructor(props){
        super(props)        
        this.state = {
            tags: this.props.data,            
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tags: nextProps.data
        })
    }

    addTag = (text) => {
        let temp = this.state.tags.slice()
        temp.push(text)
        this.setState({ tags: temp })        
        this.props.update(this.props.type, temp)
    }

    removeTag = (index) => {
        let temp = this.state.tags.slice()
        temp.splice(index, 1)        
        this.setState({ tags: temp })
        this.props.update(this.props.type, temp)
    }   

    render() {                    
        return (
            <Tags data={ this.state.tags } editable={this.props.editable} removeTag={(index) => this.removeTag(index)} addTag={ (text) => this.addTag(text) } />
        )
    }
}

const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {                
        display: 'none'
    }
}

let profile = {};

class Candidate extends Component {
    constructor(props){
        super(props)
        this.state = {
            percentage: 0,
            value: { min: 70, max: 100 },
            loading: true,
            profileId:      props.profileId,
            fullName:       props.fullName,
            email:          props.email,
            phone:          props.phone,
            skype:          props.skype,
            proPicURL:      props.proPicURL,
            role:           props.roles,
            opportunities:  props.subRoles,
            locations:      props.locations,
            status:         props.status,
            social:         props.social,
            skills:         props.techs,
            switched:       props.status === 1
        }
    }

    componentWillMount() {
        console.log('Candidate:componentWillMount');
        if (!this.props.isLoggedIn) {
            browserHistory.push('/signin/talent');
        }
        if (this.props.profileId && !this.props.isCompleted) {
            browserHistory.push('/profile/talent/person');
        }
        autoScrolling();
    }

    componentDidMount() {
        console.log('Candidate:componentDidMount');
        if (this.props.isLoggedIn) {
            const headers = { Authorization: this.props.header };
            this.props.actions.getUserProfile(headers)
            .then((data) => {
                if (!this.props.isCompleted) {
                    browserHistory.push('/profile/talent/person');
                }
                profile = data;
                this.setState({
                    profileId:      this.props.profileId,
                    fullName:       this.props.fullName,
                    email:          this.props.email,
                    phone:          this.props.phone,
                    skype:          this.props.skype,
                    proPicURL:      this.props.proPicURL,
                    role:           this.props.roles,
                    opportunities:  this.props.subRoles,
                    locations:      this.props.locations,
                    status:         this.props.status,
                    social:         this.props.social,
                    skills:         this.props.techs,
                    switched:       this.props.status === 1,
                    loading:        false
                });
            })
            .catch((error) => {
                if (error.status === 404) {
                    browserHistory.push('/profile/talent/person');
                    return;
                }
                this.props.actions.reset();
                browserHistory.push('/signin/talent');
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Candidate:componentWillReceiveProps:nextProps:', nextProps);
        const { subRoles, techs, locations, status, isEditable } = nextProps;
        this.setState({
            opportunities: subRoles,
            status: status,
            skills: techs,
            locations: locations
        });

        if (!isEditable && this.props.isEditable !== isEditable) {
            this.updateProfile();
        }
    }

    toggleSwitch = () => {        
        let status;
        if(this.state.status !== 1){
            status = 1;
        } else {
            status = 0;
        }        
        this.props.actions.updateStatus(status)        
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            }
        });
    }

    onChange = (value) => {
        this.setState({ value })
    }

    pageNavigation = (path) => {
        browserHistory.push(path)
        autoScrolling()
    }

    getPercentage = (opp, skills, locations, social, phone, skype) => {               
        let percentage = 0
        if(opp.length !== 0){
            percentage = percentage + 20
        }
        if(skills.length !== 0){
            percentage = percentage + 20
        }
        if(locations.length !== 0){
            percentage = percentage + 20
        }
        if(social.length !== 0){
            percentage = percentage + 20
        }
        if(skype && skype.length !== 0 && phone && phone.length !== 0){
            percentage = percentage + 20
        }
        return percentage
    }

    getPhone = (e) => {
        this.setState({ phone: e.target.value })
    }

    getSkype = (e) => {
        this.setState({ skype: e.target.value })
    }

    updateProfile = () => {
        console.log('Candidate.updateProfile:start');
        const { status, skype, phone, opportunities, skills, locations } = this.state
        profile.skype = skype;
        profile.phone = phone;
        if (status <= 1) profile.jobSeekingStatus = status;
        profile.subRoles = opportunities;
        profile.technologies = skills;
        profile.locations = locations;
        console.log('Candidate.updateProfile:profile', profile);
        const headers = { Authorization: this.props.header };
        this.props.actions.updateProfileInfo('Profile', profile, headers)
            .then(() => console.log('Updated successfully'))
    }

    render() {                
        const { value } = this.state;
        const { fullName, email, phone, skype, proPicURL, opportunities, skills, locations, social, role, switched } = this.state;
        const { isEditable } = this.props;
        if (this.state.loading) {
            return <div style={{display:'flex', justifyContent:'center'}}><ReactLoading type="bubbles" color="#4cbf69" height='100' width='100' /></div>
        } else { 
            let percentage = this.getPercentage(opportunities, skills, locations, social, phone, skype)                
            return (
                <Wrapper>
                    <Header edit/>
                    <Heading>Your Profile</Heading>
                    <UserWrapper>
                        {proPicURL
                            ? <Avatar src={proPicURL} alt="user" />
                            : <Avatar src={Images.user} alt="user" />
                        }
                        <User>
                            <h1>{fullName}</h1>
                            { role &&
                                <p>{role[0]}</p>                                     
                            }                        
                            <ToggleWrapper>
                                <p>Active</p>                            
                                    <Switch onClick={this.toggleSwitch} on={switched}/>                            
                                <p>Passive</p>
                            </ToggleWrapper>                        
                        </User>
                    </UserWrapper>
                    <DetailWrapper>
                        <CircleWrapper>
                            <BgCircle>
                                <CircularProgressbar
                                    percentage={percentage}
                                    strokeWidth="12"
                                    sqSize="140"/>                            
                            </BgCircle>
                            {percentage === 100 ? <p>complete</p> : <p>uncomplete</p>}
                        </CircleWrapper>                    
                        <Detail>
                            <h1>Contacts details</h1>
                            <div>
                                <div>
                                    <p>E-mail</p>
                                    <p>Phone</p>
                                    <p>Skype</p>    
                                </div>
                                <div>
                                    <p>{email}</p>                                
                                    {isEditable ? 
                                    <MuiThemeProvider>
                                        <TextField  
                                            name="phone"                                                                            
                                            onChange={this.getPhone}                                                       
                                            value={phone}
                                            placeholder="Please add your phone number"
                                            floatingLabelStyle={styles.floatingLabelStyle}  
                                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                                            underlineShow={false}
                                        />              
                                    </MuiThemeProvider> : <p>{phone}</p> }
                                    {isEditable ? 
                                    <MuiThemeProvider>
                                        <TextField    
                                            name="skype"                                                                          
                                            onChange={this.getSkype}                                                       
                                            value={skype}
                                            placeholder="Please add your skype"
                                            floatingLabelStyle={styles.floatingLabelStyle}  
                                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                                            underlineShow={false}
                                        />              
                                    </MuiThemeProvider> : <p>{skype}</p> }   
                                </div>
                            </div>                                              
                        </Detail>
                    </DetailWrapper>                
                    <FieldWrapper>
                        <h1>Social media</h1>  
                        <div>
                            <div>                  
                            { social && social.map((social, index) => {
                                let socialUrl
                                if(social.indexOf('github.com') !== -1){
                                    socialUrl = <img key={index} src={Images.github} alt="git" />
                                } 
                                else if(social.indexOf('linkedin.com') !== -1){
                                    socialUrl = <img key={index} src={Images.linkedin} alt="linkedin" />
                                }
                                else if(social.indexOf('facebook.com') !== -1){
                                    socialUrl = <img key={index} src={Images.facebook} alt="facebook" />
                                } 
                                else if(social.indexOf('google.com') !== -1){
                                    socialUrl = <img key={index} src={Images.google1} alt="google" />
                                } 
                                else if(social.indexOf('behance.com') !== -1){
                                    socialUrl = <img key={index} src={Images.behance} alt="behance" />
                                } 
                                return socialUrl                                                              
                            })} 
                            </div>    
                            <div>                  
                            { social && social.map((social, index) => {                            
                                return <p key={index}>{social}</p>                                                                                   
                            })} 
                            </div>                              
                        </div>                                                                                          
                    </FieldWrapper>                
                    <TagWrapper>
                        <h1>Opportunities I'm interested in</h1>
                        { opportunities && isEditable ?
                            <TagList type="role" editable={isEditable} data={opportunities} update={this.props.actions.updateCategory}/> : <TagList data={opportunities} />
                        }                    
                    </TagWrapper>
                    <TagWrapper>
                        <h1>My Skills</h1>
                        { skills && isEditable ?
                            <TagList type="tech" editable={isEditable} data={skills} update={this.props.actions.updateCategory}/> : <TagList data={skills} />
                        }                    
                    </TagWrapper>
                    <TagWrapper>
                        <h1>Locations I'm interested in</h1>
                        { locations && isEditable ?
                            <TagList type="location" editable={isEditable} data={locations} update={this.props.actions.updateCategory}/> : <TagList data={locations} />
                        }                    
                    </TagWrapper>
                    <Slider>
                        <h1>Salary range</h1>
                        <InputRange
                            maxValue={150}
                            minValue={0}            
                            formatLabel={value=> `EUR ${value}.000`}
                            value={value}
                            onChange={this.onChange}
                        />
                    </Slider>
                    <Info>
                        <h1>Additional info</h1>
                        <p>
                        You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
                        </p>
                    </Info>
                    <Contact >
                        <a onClick={() => this.pageNavigation('/contact')}>Contact my agent</a>
                    </Contact>
                    <Footer />
                </Wrapper>
            )
        }
    }
}

// Map state to props
const mapStateToProps = (state) => {
    const {
        profileId,
        fullName,
        email,
        phone,
        skype,
        proPicURL,
        roles,
        subRoles,
        locations,
        status,
        social,
        techs,
        isCompleted
    } = state.talent;
    return {
        user: state.auth,
        isEditable: state.auth.isEditable,  
        isLoggedIn: state.auth.isLoggedIn,
        header: state.auth.header,
        profileId,
        fullName,
        email,
        phone,
        skype,
        proPicURL,
        roles,
        subRoles,
        locations,
        status,
        social,
        techs,
        isCompleted
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            updateStatus,
            updateCategory,
            getUserProfile,
            updateProfileInfo,
            reset
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Candidate)