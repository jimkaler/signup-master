import React from 'react'

import { 
    Wrapper, 
    Fraction, 
    Slash, 
    Number, 
    ProgressBar, 
    ActiveBar } from './Style'

class Progress  extends React.Component {

    render() {        
        const { visible, save, percent } = this.props
        if(visible){
            return (            
                <Wrapper save={save}>
                    <Fraction save={save}>
                        <Number>{percent}</Number>
                        <Slash />
                        <Number static>3</Number>
                    </Fraction>
                    <ProgressBar percent={percent}>
                        <ActiveBar />
                    </ProgressBar>
                </Wrapper>
            )
        } else {
            return null            
        }             
    }
}

export default  Progress