import React from 'react'
import Switch from 'react-toggle-switch'
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css" 
import { connect } from 'react-redux'

import { changeType } from '../../actions/auth'
import { Wrapper } from './Style'

class Model extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            switched: this.props.type === 'employer'
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            switched: nextProps.type === 'employer' ? true : false
        })
    }

    toggleSwitch = () => {
        const { dispatch } = this.props
        let type = this.state.switched ? 'talent' : 'employer'        
        dispatch(changeType(type))
    }

    render () {            
        return (
            <Wrapper>
                <span>Talent</span><Switch onClick={this.toggleSwitch} on={this.state.switched}/><span>Employer</span>
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

export default connect(mapStateToProps)(Model)