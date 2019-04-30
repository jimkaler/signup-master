import React from 'react'
import { browserHistory } from 'react-router'

import { Heading, Img } from './Style'
import Images from '../../themes/images'
import { logoAnimation } from '../../jquery';

class Logo extends React.Component {
    constructor(){
        super()
        this.state = {
            isEnable: false
        }
    }

    gotoHome = (path) => {       
        setTimeout(function() {
           logoAnimation('add') 
        }, 100) 
        setTimeout(function() {
           logoAnimation('remove')
           browserHistory.push(path) 
        }, 300)             
    }

    render() {
        return (                    
            <Heading onClick={() =>this.gotoHome("/")}>
                <Img className="logo" src={Images.logo_home} alt="logo" />
            </Heading>        
        )
    }
}
    
export default Logo