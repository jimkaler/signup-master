import React, { Component } from 'react'
import Header from '../../components/Header'
import MainBanner from '../../components/MainBanner'
import HowItWork from '../../components/HowItWork'
import Footer from '../../components/Footer'
import { Wrapper } from './Style'


class LandingPage extends Component {

    render() {
        return (
            <div>
                <Wrapper>
                    <Header landing />
                    <MainBanner />
                </Wrapper>
                <HowItWork />
                <Footer />
            </div>
        )
    }
}

/* Connect Component with Redux */
export default LandingPage