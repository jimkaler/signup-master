import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { 
    Wrapper,
    Heading, 
    Info,
    Q, A
 } from './Style'

class FAQ extends Component {

    render() {
        const { type } = this.props
        return (
            <Wrapper>
                <Header />
                <Heading>FAQ</Heading>
                { type === 'talent' ? 
                    <Info>                        
                        <Q>Q: What is Agentify?</Q>
                        <A>A: Agentify is your personal agent, helping you find your next career opportunity. We match your skillset with one or more employers, and handle the entire process from start to offer. Everything starts with you, not the employer - we’re basically reversing the normal process of applying and interviewing for a job.</A>

                        <Q>Q: Why should I use Agentify?</Q>
                        <A>A: Agentify works with some of the coolest startups and organisations, and gives you more and better opportunities - often at the same time, so you can choose the best offer.</A>

                        <Q>Q: Is my data safe?</Q>
                        <A>A: Yes! Agentify is built GDPR compliant, and your data is safe and encrypted.</A>

                        <Q>Q: Will my existing employer see my profile?</Q>
                        <A>A: No! We believe in the power of our awesome algorithm, which matches your profile with opportunity - but every single talent goes through manual processing and contact. After all finding the right match is all about people and chemistry. Your current employer will never get access to your profile.</A>

                        <Q>Q: How much does it cost?</Q>
                        <A>A: Agentify is free to use for talent.</A>

                        <Q>Q: There isn’t that much functionality yet, is this the final product?</Q>
                        <A>A: No! Agentify is currently in public beta. We’re adding functionality continuously - let us know if you have any suggestions!</A>

                        <Q>Q: Can I refer a friend?</Q>
                        <A>A: Yep! We’re adding that to your talent page shortly - in the meantime feel free to share the link.</A>                    
                    </Info> :
                    <Info>                        
                        <Q>Q: What is Agentify?</Q>
                        <A>A: Agentify is an ATS (Applicant Tracking System) and sourcing platform combined. Hiring has never been this easy, and your progress, sourcing channels and hires are visualized for better overview and understand your key metrics. When your traditional channels aren’t working, you can use Agentify to source talent on a global scale - at a far lower CAC (Cost of Aqcuisition) than before.</A>
                        
                        <Q>Q: Why should I use Agentify?</Q>
                        <A>A: Using a hybrid product like Agentify enables you to hire the best talent at a far lower CAC (Cost of Acquisition) than before. And since we only work with active candidates, you can hire faster too.</A>
                        
                        <Q>Q: Is my data safe?</Q>
                        <A>A: Yes! Agentify is built GDPR compliant, and your data is safe and encrypted.</A>
                        
                        <Q>Q: What is GDPR? </Q>
                        <A>A: Check out the description here (link to GDPR page), but in short GDPR stands for General Data Protection Regulation, which is being implemented in EU May 2018. GPDR ensures that all data - in this case regarding candidates - is handled securely, and that amongst many other rules candidates have “the right to be forgotten”. If your organisation is in breach of GDPR, you risk fines of up to 4 % of your turnover or 20m € - whichever is higher.</A>
                        
                        <Q>Q: Is my current ATS / system GDPR compliant?</Q>
                        <A>A: If you’re not sure, and if your vendor hasn’t informed you that your system is GDPR compliant - then probably not.</A>
                        
                        <Q>Q: Our candidate data is spread across multiple systems, spreadsheets etc. - can you help us migrate our data and become GDPR compliant? </Q>
                        <A>A: Yes! Get in touch (link to contact page) and we’ll tell you more</A>
                        
                        <Q>Q: How do you make sure that we get matched with the right talent? </Q>
                        <A>A: We believe in the power of our awesome algorithm, which matches talent profiles with your vacancies - but every single talent also goes through rigorous manual processing and personal contact. After all finding the right match is all about people and chemistry. </A>
                        
                        <Q>Q: How much does it cost?</Q>
                        <A>A: Get in touch (link to contact page) and we’ll tell you more</A>
                        
                        <Q>Q: There isn’t that much functionality yet, is this the final product?</Q>
                        <A>A: No! Agentify is currently in public beta. We’re adding functionality continuously - let us know if you have any suggestions!</A>
                        
                        <Q>Q: I’m concerned that you might be good at building an ATS, but that you don’t know much about finding and hiring the right talent - and how our HR organisation actually works?</Q>
                        <A>A: Bjorn Andersen, Co-founder, has 15 years experience of finding and hiring top talent for startups and global organisations. We’re pretty good at what we do.</A>
                        
                        <Q>Q: I’m interested in hiring executive talent - is that possible through Agentify?</Q>
                        <A>A: Get in touch (link to contact page) and we’ll tell you more and share a reference list</A>                                                
                    </Info>
                }                
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

export default connect(mapStateToProps)(FAQ)