import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactLoading from 'react-loading'

import { 
    Wrapper, 
    Heading, 
    Info, 
    MapContainer, 
    Form, 
    UnderLine, 
    Button } from './Style'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MapView from '../../components/Map'
import { sendMessage } from '../../actions/auth'

const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {                
        display: 'none'        
    }
}

class Contact extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false
        }
    }

    getValue = (e) => {        
        const { name, value } = e.target
        this.setState({ [name]: value})
    }

    sendMessage = () => {
        
        const { mail, name, comment } = this.state
        console.log(mail, name, comment)
        if(mail === undefined || name === undefined || comment === undefined ){
            alert('Please fill out')
            return
        }
        const obj = {
            Email: this.state.mail,
            Name: this.state.name,
            Body: this.state.comment
        }
        this.setState({ isLoading: true })
        this.props.actions.sendMessage('ContactForm', obj)
            .then(() => {
                alert('Message has been sent successfully!')
                this.setState({ isLoading: false })
            })
            .catch(() => {
                alert('Message has not been sent. Please try again.')
                this.setState({ isLoading: false })
            })
    }

    render() {
        return (
            <Wrapper>
                <Header />
                <Heading>Contact</Heading>
                <Info>
                    <h1>Agentify ApS</h1>
                    <p>August Bournonvilles Passage 1</p>
                    <p>1055 København K</p>                    
                    <a>hello@Agentify.me</a>
                </Info>
                <MapContainer><MapView/></MapContainer>
                <Form>
                    <MuiThemeProvider>
                        <TextField 
                            name="name"   
                            onKeyDown={this.getValue}                                                       
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
                            name="mail"
                            onKeyDown={this.getValue}                                                       
                            floatingLabelText="E-mail"
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
                            name="comment"  
                            onKeyDown={this.getValue}                                                       
                            floatingLabelText="Comment"
                            floatingLabelStyle={styles.floatingLabelStyle}  
                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                            underlineShow={false}
                            multiLine={true}
                            rows={5}
                        />              
                    </MuiThemeProvider>                         
                </Form>                                            
                <UnderLine ></UnderLine> 
                <Button>
                    {this.state.isLoading ? 
                        <ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' />
                        : <a onClick={this.sendMessage}>Send</a>
                    }
                </Button>
                <Footer />
            </Wrapper>
        )
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            sendMessage            
        }, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Contact)