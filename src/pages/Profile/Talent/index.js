import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUserProfile } from '../../../actions/talent'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class TalentPage extends Component {

    componentWillMount(){        
        // if (!this.props.isLoggedIn){
        //     this.props.type === 'talent'
        //     ? browserHistory.push('/signin/talent')
        //     : browserHistory.push('signup/employer');
        // }
        // console.log(cookies.get('isLoggedIn'))
        // if(!cookies.get('isLoggedIn')){
        //     console.log(cookies.get('isLoggedIn'))
        // }
        if (cookies.get('isLoggedIn')==='false'){
            cookies.get('authType') === 'talent'
            ? browserHistory.push('/signin/talent')
            : browserHistory.push('signup/employer');
            console.log('COOKIES NOT ENABLED');
        }else{
            console.log(" Logged In "+cookies.get('isLoggedIn'));
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