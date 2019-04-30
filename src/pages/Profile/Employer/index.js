import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import CircularProgressbar from '../../../components/CircularProgressbar'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Tags from '../../../components/Tags'
import { 
    Wrapper,
    Heading,
    UserWrapper,
    Avatar,
    LocationWrapper,
    DetailWrapper,
    CircleWrapper,
    BgCircle,
    Detail,
    Info,
    TagWrapper,
    FieldWrapper,
    Contact 
    } from './Style'
import Images from '../../../themes/images'

class TagList extends Component {
    constructor(props){
        super(props)        
        this.state = {
            tags: this.props.data
        }
    }

    addTag = (text) => {
        let temp = this.state.tags.slice()
        temp.push(text)
        this.setState({ tags: temp })
    }

    removeTag = (index) => {
        let temp = this.state.tags.slice()
        temp.splice(index, 1)
        this.setState({ tags: temp })
    }

    render() {
        return (
            <Tags data={ this.state.tags } editable={this.props.editable} removeTag={(index) => this.removeTag(index)} addTag={ (text) => this.addTag(text) } />
        )
    }
}

class Employer extends Component {
    constructor(){
        super()
        this.state = {
            percentage: 65,
            vacancies: ["Backend Developer", "Frontend Developer"],
            locations: ["Copenhagen", "London"],
        }
    }

    pageNavigation = (path) => {
        browserHistory.push(path)
    }

    render() {
        const { percentage, vacancies, locations } = this.state
        const { isEditable } = this.props
        return (
            <Wrapper>
                <Header edit/>
                <h2><b>Thanks! We'll get back to you asap</b></h2>
                <h2><b>In the meantime - this is what your employer page would look like</b></h2>
                <Heading>CoolWorks</Heading>
                <UserWrapper>
                    <Avatar src={Images.user} alt="user" />
                    <LocationWrapper>
                        <h1>Locations</h1>
                        { locations && isEditable ?
                            <TagList editable={isEditable} data={locations} /> : <TagList data={locations} />
                        }
                    </LocationWrapper>
                </UserWrapper>
                <DetailWrapper>
                    <CircleWrapper>
                        <BgCircle>
                            <CircularProgressbar
                                percentage={percentage}
                                strokeWidth="12"
                                sqSize="140"/>                            
                        </BgCircle>
                        <p>complete</p>
                    </CircleWrapper>                    
                    <Detail>
                        <h1>Contacts details</h1>
                        <div>
                            <div>
                                <p>E-mail</p>
                                <p>Phone</p>
                                <p>Web</p>    
                            </div>
                            <div>
                                <p>jobs@coolworks.com</p>
                                <p>+45 66778899</p>
                                <p>hello@coolworks.com</p>    
                            </div>
                        </div>                                              
                    </Detail>
                </DetailWrapper>                              
                <Info>
                    <h1>Description</h1>
                    <p>
                    You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
                    </p>
                    <a>Edit company description</a>
                </Info>
                <Info>
                    <h1>Why would you work here?</h1>
                    <p>
                    You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
                    </p>
                </Info>
                <TagWrapper>
                    <h1>Vacancies</h1>
                    { vacancies && isEditable ?
                        <TagList editable={isEditable} data={vacancies} /> : <TagList data={vacancies} />
                    }
                </TagWrapper>
                <FieldWrapper>
                    <h1>Invites</h1>
                    <div>
                        <a>28</a><p>Sent</p>
                    </div>
                    <div>
                        <a>11</a><p>Rejected</p>
                    </div>
                    <div>
                        <a>17</a><p>Accepted</p>
                    </div>
                </FieldWrapper>
                <Contact>
                    <a onClick={() => this.pageNavigation('/contact')}>Contact my agent</a>
                </Contact>
                <Footer />
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {  
        isEditable: state.auth.isEditable    
    }
}

export default connect(mapStateToProps)(Employer)