import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router'

import { 
    Wrapper, 
    Heading,      
    Form, 
    UnderLine, 
    Button } from './Style'
import Header from '../../../components/Header'

const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {                
        display: 'none'        
    }
}

class SignUp extends Component {
    
    getText = (e) => {        
        if(e.keyCode === 13 && e.target.value) {            
            console.log(e.target.value)            
        }
    }

    pageNavigation = (path) => {
        browserHistory.push(path)
    }

    render() {
        return (
            <Wrapper>                                
                <Header />
                <Heading>Tell me more about Agentify</Heading>                              
                <Form>
                    <MuiThemeProvider>
                        <TextField    
                            onKeyDown={this.getText}                                                       
                            floatingLabelText="Name"
                            floatingLabelStyle={styles.floatingLabelStyle}  
                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                            underlineShow={false}
                        />              
                    </MuiThemeProvider>                         
                </Form>                                            
                <UnderLine ></UnderLine> 
                <Form>
                    <MuiThemeProvider>
                        <TextField    
                            onKeyDown={this.getText}                                                       
                            floatingLabelText="E-mail"
                            floatingLabelStyle={styles.floatingLabelStyle}  
                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                            underlineShow={false}
                        />              
                    </MuiThemeProvider>                         
                </Form>                                            
                <UnderLine ></UnderLine>                
                <Button onClick={() => this.pageNavigation('/profile/employer')}><a>Tell me more</a></Button>                
            </Wrapper>
        )
    }
}

export default SignUp