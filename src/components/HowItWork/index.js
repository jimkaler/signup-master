import React, { Component } from 'react'
import { 
    Wrapper, 
    FlexWrapper, 
    Heading, 
    Content, 
    Img, 
    RightArrow, 
    VerticalArrow } from './Style'
import Images from '../../themes/images'

export default class CallToAction extends Component {
    render() {
        return (
            <Wrapper>
                <Heading>How it works</Heading>
                <FlexWrapper>
                    <Img>
                        <embed src={Images.employer} />              
                    </Img>
                    <RightArrow src={Images.bRightArrow} alt="" />
                    <VerticalArrow src={Images.verticalArrow} alt="" />
                    <Img>
                        <embed src={Images.talent}/>              
                    </Img>
                </FlexWrapper>
                <FlexWrapper>
                    <Content>
                        <p>We believe that great talent deserves an Agent.</p>
                        <p>Employers are usually well presented by an internal or external recruiter, and 
                          everything starts with their expectations and requirements. They choose the best candidate.</p>    
                    </Content>
                    <Content>
                        <p>At Agentify <b>everything starts with you</b>. Using the Agentify behaviour model to 
                        understand you, your hopes and ambitions, we help you find the perfect opportunity and build your career.</p>
                        <p>We give you more and better career options to choose from, when you feel it’s time for a change. <b>
                          From now on you choose the best employer, not the other way around</b>.</p>
                    </Content>
                </FlexWrapper>
            </Wrapper>
        )
    }
}