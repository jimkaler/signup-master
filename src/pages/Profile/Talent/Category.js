import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router'
import {Form, Checkbox, Radio, RadioGroup } from 'react-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactLoading from 'react-loading'
import AlertContainer from 'react-alert'

import { getSubRolesAndTechs, postSignup2Data } from '../../../actions/talent'
import Header from '../../../components/Header'
import TagList from '../../../components/TagList'
import Images from '../../../themes/images'
import { 
    Wrapper, 
    Content, 
    Heading, 
    FieldWrapper,
    FlexWrapper,
    TextFieldWrapper, 
    SubHeading, 
    ButtonWrapper, 
    RadioButton, 
    Input, 
    UnderLine, 
    TagWrapper, 
    Navigation, 
    PrevButton,
    NextButton, 
    Img,
    FormButton,
    FormButtonWrapper,
    FormWrapper,
    AddButton } from './Style'
import { autoScrolling } from '../../../jquery';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const expires = new Date();
expires.setTime(expires.getTime() + 2 * 3600 * 1000);
const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {
        display: 'none'
    }
}

// let subRolesForSave

class Category extends Component {
    constructor(props){
        super(props)        
        this.state = {
            active: false,     
            initSubRole: {},                         
            tags: this.props.techs,
            engineering: "Backend Engineer, Frontend Engineer, Fullstack Engineer, Mobile, DevOps and Tooling, QA",
            sales: "Sales Representative, Account Executive, Sales Manager, Sales Director",
            product: "Product Analyst, Product Marketing Manager, Product Manager, Product Line Director",
            marketing: "Growth Hacker, marketing Manager, SEO Manager, Community Manager, Copy",
            design: "UX Researcher, UI Designer, UI/UX Designer, Art Director, Digital Designer",
            finance: "Analyst, Accountant, Controller, Finance Manager, CEO",
            isLoading: false,
            tech: '',                                                    
            isAvailable: false  
        }
    }

    componentWillMount(){      

        if(!cookies.get('isLoggedIn')){
            browserHistory.push('/signin/talent');
        }
        autoScrolling()   
        let temp = {}   

        if(this.props.subRoles){
            this.props.subRoles.map(subRole => {                 
                let tempSubRole
                subRole === 'UI/UX Designer' ? tempSubRole = (subRole.substring(3, 14)).replace(" ", '_') : tempSubRole = subRole.replace(" ", '_')          
                return temp[tempSubRole] = true
            })
        }        
        this.setState({
            initSubRole: temp
        })
    }

    addTag = (text) => {
        var data = this.state.tags;
        // if(data==""){
            text = text.replace(/[\W_]+/g," ");  
            let temp = this.state.tags.slice()        
            temp.push(text)
            this.setState({ tags: temp })
        // }

    }

    removeTag = (index) => {
        let temp = this.state.tags.slice()
        temp.splice(index, 1)
        this.setState({ tags: temp })
    }

    getText = (e) => {                
        if(e.keyCode === 13 && e.target.value) {            
            e.preventDefault()
            this.addTag(e.target.value)            
            e.target.value = null
            this.setState({ isAvailable: false })
        }        
    }

    getTech = (e) => {     
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        format.test(e.target.value) ? this.setState({ enableAdd: false, place: e.target.value }) : this.setState({ enableAdd: true, place: e.target.value })   
        e.target.value ? this.setState({ isAvailable: true, tech: e.target.value }) : this.setState({ isAvailable: false, tech: e.target.value })
    }

    addTech = () => {
        this.addTag(this.state.tech)
        this.tagInput.input.value = null
        this.tagInput.focus()
        this.setState({ isAvailable: false })
    }

    pageNavigation = (path) => {
        if(!this.props.isLoggedIn){
            browserHistory.push('/')
        } else {
            browserHistory.push(path)
        } 
        autoScrolling()      
    }

    alertOptions = {
        offset: 14,
        position: 'bottom right',
        theme: 'light',
        time: 0,
        transition: 'scale'
    }
     
    showAlert = () => {
        this.msg.info('Please fill out all fields.', {
            time: 0,
            type: 'info',
        })
    }
    techAlert = () => {
        this.msg.info('only single value is allowd.', {
            time: 0,
            type: 'info',
        })
    }

    getSubRoles = (values) => {
        let subRoles = [];
        let roles = [];
        let inveniasRoleKeys = "";
        let inveniasSubRoleKeys = "";

        Object.keys(values).forEach((key) => {
            if(key !== 'role' && values[key] === true) {
                key === 'UX_Designer'
                    ? subRoles.push(('UI/' + key).replace(/_/g, " "))
                    : subRoles.push(key.replace(/_/g, " "))
                    inveniasRoleKeys = "b1905f13-64b4-41f7-9398-4997c4ea4275";
                    
            }
        });
        subRoles.forEach((subRole) => {            
            if(this.state.engineering.indexOf(subRole) !== -1){
                if(roles.indexOf("Engineering") === -1){
                    roles.push("Engineering")
                    inveniasRoleKeys = "ca99c515-723b-4e2e-8e0e-c8cc641cae2b";
                }                
            }
            else if(this.state.sales.indexOf(subRole) !== -1){
                if(roles.indexOf("Sales") === -1){
                    roles.push("Sales")
                    inveniasRoleKeys = "30e35908-c305-45e5-be33-ab5983de7340";
                }                
            }
            else if(this.state.product.indexOf(subRole) !== -1){
                if(roles.indexOf("Product") === -1){
                    roles.push("Product")
                    inveniasRoleKeys = "bb1993b1-fbd2-4bab-b86a-b8be0070363a";
                }                
            }
            else if(this.state.marketing.indexOf(subRole) !== -1){
                if(roles.indexOf("Marketing") === -1){
                    roles.push("Marketing")
                    inveniasRoleKeys = "4a32cd28-14e7-4124-9d9f-da78b1689155";
                }                
            }
            else if(this.state.design.indexOf(subRole) !== -1){
                if(roles.indexOf("Design") === -1){
                    roles.push("Design")
                    inveniasRoleKeys = "b1905f13-64b4-41f7-9398-4997c4ea4275";
                }                
            }
            else if(this.state.finance.indexOf(subRole) !== -1){
                if(roles.indexOf("Finance") === -1){
                    roles.push("Finance")
                    inveniasRoleKeys = "a14f32ca-3b55-45de-8fd5-dbac3b1befc0";
                }                
            }
        })
        if(roles.length<1 || subRoles.length<1){
            this.showAlert();
        }else{
        switch(subRoles[0]){
            case "Backend Engineer": 
            inveniasSubRoleKeys="f4309a63-a2f9-42ee-b6ec-7787aa4df09a";
            break;
            case "Frontend Engineer": 
            inveniasSubRoleKeys="c62792a0-f1b0-4170-b107-850f0b443841";
            break;
            case "Fullstack Engineer": 
            inveniasSubRoleKeys="0f1a9104-a1b0-4edb-944d-da91b7b4217c";
            break;
            case "Mobile": 
            inveniasSubRoleKeys="7ceb0e76-734b-4d4c-ba18-142346ddcc7c";
            break;
            case "DevOps and Tooling": 
            inveniasSubRoleKeys="c6a1762c-47e6-449c-a2ce-872fc0d4cef7";
            break;
            case "QA": 
            inveniasSubRoleKeys="fa2005eb-84ee-4fce-bf82-e9a9b235f3c9";
            break;
            case "Sales Representative": 
            inveniasSubRoleKeys="9c3a8136-aa3d-4769-a5ac-e785ba5bd74f";
            break;
            case "Account Executive": 
            inveniasSubRoleKeys="1f1d4c3c-a96e-42bd-ab1f-12fc5d6a5e86";
            break;
            case "Sales Manager": 
            inveniasSubRoleKeys="54a2ec7e-1048-48d6-8541-1468c0264a5f";
            break;
            case "Sales Director": 
            inveniasSubRoleKeys="e40beee7-4bb8-4d0a-a19d-6421368110c8";
            break;
            case "Product Analyst": 
            inveniasSubRoleKeys="c52fa889-7498-4c73-93b4-a82735fd309f";
            break;
            case "Product Marketing Manager": 
            inveniasSubRoleKeys="d1bc1033-8d46-4f58-8315-c64dc866da86";
            break;
            case "Product Manager": 
            inveniasSubRoleKeys="dd1d663a-6b1a-49c3-9350-ef46f304745e";
            break;
            case "Product Line Director": 
            inveniasSubRoleKeys="05857e34-4894-4d8a-9656-7a473a53f7bd";
            break;
            case "Growth Hacker": 
            inveniasSubRoleKeys="ead33e8f-27a1-4ca0-8c57-aca9bc8bd0ee";
            break;
            case "Marketing Manager": 
            inveniasSubRoleKeys="ef2af3fc-3e18-4bc8-a6b4-ff838917c05a";
            break;
            case "SEO Manager": 
            inveniasSubRoleKeys="50e46ce5-7ca8-4bad-902f-0e42c2665c79";
            break;
            case "Community Manager": 
            inveniasSubRoleKeys="f6cd32d2-99b0-45b6-9112-d1b56bf382e1";
            break;
            case "Copy": 
            inveniasSubRoleKeys="379a4768-55bc-42f2-b2c2-915150070228";
            break;
            case "UX Researcher": 
            inveniasSubRoleKeys="8a7cc91a-9f4c-4690-9aa9-6bf2aec23798";
            break;
            case "UI Designer": 
            inveniasSubRoleKeys="34257268-d318-44ad-aed3-813358760262";
            break;
            case "UX Designer": 
            inveniasSubRoleKeys="b9238de3-5e0e-4ab9-8930-6835ce1ea8f0";
            break;
            case "Art Director": 
            inveniasSubRoleKeys="d279f6b3-7240-4003-b3f3-7950261a1e8b";
            break;
            case "Digital Designer": 
            inveniasSubRoleKeys="8ccc02e7-6a00-4a67-a8fb-d404a82ef6a6";
            break;
            case "Analyst": 
            inveniasSubRoleKeys="10c67f2d-34be-4a2b-b777-eaa04c389343";
            break;
            case "Accountant": 
            inveniasSubRoleKeys="164e15ea-6975-4fad-b714-b6bf8a6674cf";
            break;
            case "Controller": 
            inveniasSubRoleKeys="352b792a-b264-44de-a766-79cda8bd0f46";
            break;
            case "Finance Manager": 
            inveniasSubRoleKeys="d69e0e53-e217-4028-b1d7-6a1c86176c14";
            break;
            case "CEO": 
            inveniasSubRoleKeys="88135e08-9686-4cf9-993d-6c42713bc435";
            break;
            default:
            inveniasSubRoleKeys="88135e08-9686-4cf9-993d-6c42713bc435";
        }
        console.log(inveniasSubRoleKeys)
        const obj = {      
            ProfileId: this.props.profileId,
            Roles: roles[0],
            SubRoles: subRoles[0],
            RoleKey:inveniasRoleKeys,
            SubRoleKey:inveniasSubRoleKeys,
            Technologies: this.state.tags
        }
        cookies.set('firstForm',obj,{path:'/',expires:expires});
        browserHistory.push('/profile/talent/submition')
        }        
        const headers = { Authorization: this.props.header };
        
        

                /*  Code for Save data in API */
        // !this.props.isCompleted ? this.props.actions.postSignup2Data('Profile/Signup2', obj, headers)
        //     .then(() => {
        //         this.props.actions.getSubRolesAndTechs(obj)
        //         setTimeout(() => {
        //             browserHistory.push('/profile/talent/submition')
        //         }, 2000)                  
        //     }).catch(() => {
        //         setTimeout(() => {
        //             this.setState({ isLoading: false })
        //             this.showAlert()                   
        //         }, 2000) 
        //     }) :  browserHistory.push('/profile/talent/submition')
    }

    render() {
        const { initSubRole, tags, isLoading, isAvailable } = this.state
        return (
            <Wrapper>   
                <Form 
                    defaultValues={initSubRole}
                    onSubmit={(values => { this.getSubRoles(values) })}
                >
                    { ({ submitForm, values }) => {                          
                        // subRolesForSave = values   
                        return (
                            <form onSubmit={submitForm}>
                            <Header visible percent={2} save/>
                            <Content>                    
                                <Heading>Help us by answering<br/>a few questions</Heading>
                                <FieldWrapper>
                                    <SubHeading>Where do you see yourself?</SubHeading>                                
                                    <RadioGroup field="role">
                                        <ButtonWrapper>
                                            <RadioButton active={values.role === 'Engineering'}><Radio value="Engineering"/>Engineering</RadioButton>
                                            <RadioButton active={values.role === 'Sales'}><Radio value="Sales"/>Sales</RadioButton>
                                            <RadioButton active={values.role === 'Product'}><Radio value="Product"/>Product</RadioButton>
                                            <RadioButton active={values.role === 'Marketing'}><Radio value="Marketing"/>Marketing</RadioButton>
                                            <RadioButton active={values.role === 'Design'}><Radio value="Design"/>Design</RadioButton>
                                            <RadioButton active={values.role === 'Finance'}><Radio value="Finance"/>Finance</RadioButton>
                                            <RadioButton active={values.role === 'Other'}><Radio value="Other"/>Other</RadioButton> 
                                        </ButtonWrapper>
                                    </RadioGroup>
                                </FieldWrapper>
                                <FormWrapper>                                                     
                                    <div style={values.role === 'Engineering' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>
                                        <FormButtonWrapper>
                                            <FormButton active={values.Backend_Engineer}><Checkbox field="Backend_Engineer" value="Backend_Engineer"/>Backend Engineer</FormButton>
                                            <FormButton active={values.Frontend_Engineer}><Checkbox field="Frontend_Engineer" value="Frontend_Engineer"/>Frontend Engineer</FormButton>
                                            <FormButton active={values.Fullstack_Engineer}><Checkbox field="Fullstack_Engineer" value="fullstack"/>Fullstack Engineer</FormButton>                                                                   
                                            <FormButton active={values.Mobile}><Checkbox field="Mobile" value="Mobile"/>Mobile</FormButton>
                                            <FormButton active={values.DevOps_and_Tooling}><Checkbox field="DevOps_and_Tooling" value="DevOps_and_Tooling"/>DevOps and Tooling</FormButton>
                                            <FormButton active={values.QA}><Checkbox field="QA" value="QA"/>QA</FormButton>
                                        </FormButtonWrapper>
                                    </div>
                                    <div style={values.role === 'Sales' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>
                                        <FormButtonWrapper>
                                            <FormButton active={values.Sales_Representative}><Checkbox field="Sales_Representative" value="Sales_Representative"/>Sales Representative</FormButton>
                                            <FormButton active={values.Account_Executive}><Checkbox field="Account_Executive" value="Account_Executive"/>Account Executive</FormButton>
                                            <FormButton active={values.Sales_Manager}><Checkbox field="Sales_Manager" value="Sales_Manager"/>Sales Manager</FormButton>                                                         
                                            <FormButton active={values.Sales_Director}><Checkbox field="Sales_Director" value="Sales_Director"/>Sales Director</FormButton>
                                        </FormButtonWrapper>
                                    </div>
                                    <div style={values.role === 'Product' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>
                                        <FormButtonWrapper>
                                            <FormButton active={values.Product_Analyst}><Checkbox field="Product_Analyst" value="Product_Analyst"/>Product Analyst</FormButton>
                                            <FormButton active={values.Product_Marketing_Manager}><Checkbox field="Product_Marketing_Manager" value="Product_Marketing_Manager"/>Product Marketing Manager</FormButton>
                                            <FormButton active={values.Product_Manager}><Checkbox field="Product_Manager" value="Product_Manager"/>Product Manager</FormButton>                                   
                                            <FormButton active={values.Product_Line_Director}><Checkbox field="Product_Line_Director" value="Product_Line_Director"/>Product Line Director</FormButton>
                                        </FormButtonWrapper>
                                    </div>
                                    <div style={values.role === 'Marketing' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>
                                        <FormButtonWrapper>
                                            <FormButton active={values.Growth_Hacker}><Checkbox field="Growth_Hacker" value="Growth_Hacker"/>Growth Hacker</FormButton>
                                            <FormButton active={values.Marketing_Manager}><Checkbox field="Marketing_Manager" value="Marketing_Manager"/>Marketing Manager</FormButton>
                                            <FormButton active={values.SEO_Manager}><Checkbox field="SEO_Manager" value="SEO_Manager"/>SEO Manager</FormButton>           
                                            <FormButton active={values.Community_Manager}><Checkbox field="Community_Manager" value="Community_Manager"/>Community Manager</FormButton>
                                            <FormButton active={values.Copy}><Checkbox field="Copy" value="Copy"/>Copy</FormButton>                    
                                        </FormButtonWrapper>
                                    </div>
                                    <div style={values.role === 'Design' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>
                                        <FormButtonWrapper>
                                            <FormButton active={values.UX_Researcher}><Checkbox field="UX_Researcher" value="UX_Researcher"/>UX Researcher</FormButton>
                                            <FormButton active={values.UI_Designer}><Checkbox field="UI_Designer" value="UI_Designer"/>UI Designer</FormButton>
                                            <FormButton active={values.UX_Designer}><Checkbox field="UX_Designer" value="UX_Designer"/>UI/UX Designer</FormButton>                             
                                            <FormButton active={values.Art_Director}><Checkbox field="Art_Director" value="Art_Director"/>Art Director</FormButton>
                                            <FormButton active={values.Digital_Designer}><Checkbox field="Digital_Designer" value="Digital_Designer"/>Digital Designer</FormButton>
                                        </FormButtonWrapper>
                                    </div>
                                    <div style={values.role === 'Finance' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>
                                        <FormButtonWrapper>
                                            <FormButton active={values.Analyst}><Checkbox field="Analyst" value="Analyst"/>Analyst</FormButton>
                                            <FormButton active={values.Accountant}><Checkbox field="Accountant" value="Accountant"/>Accountant</FormButton>
                                            <FormButton active={values.Controller}><Checkbox field="Controller" value="Controller"/>Controller</FormButton>                                
                                            <FormButton active={values.Finance_Manager}><Checkbox field="Finance_Manager" value="Finance_Manager"/>Finance Manager</FormButton>
                                            <FormButton active={values.CEO}><Checkbox field="CEO" value="CEO"/>CEO</FormButton>
                                        </FormButtonWrapper>
                                    </div>
                                </FormWrapper>
                                <FieldWrapper tech>
                                    <SubHeading>Preferred technology</SubHeading>
                                    <FlexWrapper>
                                        <TextFieldWrapper>
                                            <Input>
                                                <MuiThemeProvider>
                                                    <TextField        
                                                        ref={(input) => {this.tagInput = input}}
                                                        onKeyDown={this.getText}
                                                        onChange={this.getTech}                                      
                                                        floatingLabelText="Type here..."
                                                        floatingLabelStyle={styles.floatingLabelStyle}
                                                        floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                                                        underlineShow={false}
                                                    />
                                                </MuiThemeProvider>
                                            </Input>                             
                                            <UnderLine ></UnderLine>
                                        </TextFieldWrapper>
                                        { isAvailable ? <AddButton active onClick={this.addTech}>Add</AddButton> : <AddButton >Add</AddButton> }
                                    </FlexWrapper>
                                </FieldWrapper>
                                <TagWrapper tech>
                                    <TagList data={ tags } removeTag={(index) => this.removeTag(index)} />
                                </TagWrapper>
                                { isLoading ? <Navigation><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></Navigation> :
                                    <Navigation>
                                        <PrevButton prev onClick={() => this.pageNavigation('/profile/talent/person')}><Img src={Images.leftArrow} alt="left" /></PrevButton>
                                        <NextButton type="submit">Next<Img right src={Images.wRightArrow} alt="right" /></NextButton>
                                    </Navigation>
                                }
                            </Content>
                            </form>
                        )
                    }}
                </Form> 
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    const { profileId, subRoles, techs, isCompleted } = state.talent
    return {
        profileId,
        subRoles,
        techs,
        isCompleted,
        isLoggedIn: state.auth.isLoggedIn,
        header: state.auth.header
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getSubRolesAndTechs,
            postSignup2Data
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)