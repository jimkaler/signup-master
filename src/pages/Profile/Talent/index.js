import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUserProfile } from '../../../actions/talent'

class TalentPage extends Component {

    componentWillMount(){        
        if (!this.props.isLoggedIn){
            this.props.type === 'talent'
            ? browserHistory.push('/signin/talent')
            : browserHistory.push('signup/employer');
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {        
        type: state.auth.type,
        header: state.auth.header,
        isLoggedIn: state.auth.isLoggedIn,
        isCompleted: state.talent.isCompleted
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getUserProfile
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TalentPage)