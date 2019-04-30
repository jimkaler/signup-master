import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { 
    Wrapper,
    Heading, 
    Info,
    FieldWrapper } from './Style'
import Images from '../../themes/images'

class Standard extends Component {

    render() {
        return (
            <Wrapper>
                <Header />
                <Heading>About Us</Heading>
                { this.props.type === 'talent' ? 
                    <Info>
                        <h1>Agentify helps you find your next opportunity.</h1>
                        <p>
                        We start with you, and match you with employers matching your profile and preferences.<br/><br/>
                        We believe that your experience and skillset plays an important part, but we don’t stop there
                        - we focus on personality and culture fit, to make sure that you thrive in your next role.
                        </p>                    
                    </Info> : 
                    <Info>
                        <h1>Agentify helps you lower your CAC (Cost of Acquisition) of finding and hiring great talent.</h1>
                        <p>
                        The Agentify platform helps you work faster and smarter, and gives you a visual presentation of your 
                        funnel, metrics and success rate for each hiring channel.<br/><br/>
                        By focusing not only on Experience and Skills, but also on Personality and Culture fit, we make sure that you’re hiring the right candidate.
                        </p>                    
                    </Info>
                }
                <FieldWrapper>
                    <img src={Images.aboutUs} alt="about" />
                    { this.props.type === 'talent' ? <p>We assign you an agent, who works with you and advises you on career change.</p> : 
                        <p>When you need better talent and faster hiring, you can engage your agent to help you source great talent and improve your funnel.</p> 
                    }
                </FieldWrapper>
                <Info>
                { this.props.type === 'talent' ?
                    <p>
                    By focusing not only on Experience and Skills, but also on Personality and Culture fit, we make sure
                    that you’re not only choosing the right employer, but also get more opportunities.<br/><br/>                    
                    And it’s free. Forever.                    
                    </p> : 
                    <p>
                    Agentify gives you access to a vast network of skilled recruiters and hiring managers. When you discover great talent but don’t have the need or the headcount,
                    you can submit talent to Agentify for others to use - and thereby reduce the cost of your next hire. We combine multiple resources to interview and assess talent
                    at a larger scale than you could ever accomplish with your own team.<br/><br/>                    
                    We believe sharing is caring and that we’re stronger together. And that by working together
                    we can reduce cost and time spent hire by hire, so you can focus on what you do best.                                        
                    </p>
                }
                </Info>
                <Footer />
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {
        type: state.auth.type
    }
}

export default connect(mapStateToProps)(Standard)