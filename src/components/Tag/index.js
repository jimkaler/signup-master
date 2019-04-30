import React, { Component } from 'react'

import { Wrapper, Icon } from './Style'
import Images from '../../themes/images'

class Tag extends Component {

    render() {        
        return (
            <Wrapper>
                {this.props.name}
                <Icon src={Images.remove} onClick={() => this.props.onRemove()} />
            </Wrapper>
        )
    }
}

export default Tag