import React, { Component } from 'react'

import { 
    Svg, 
    FgCircle, 
    BgCircle, 
    Text } from './Style'

class CircularProgressBar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
  
    render() {      
        const sqSize = this.props.sqSize      
        const radius = (this.props.sqSize - this.props.strokeWidth) / 2      
        const viewBox = `0 0 ${sqSize} ${sqSize}`      
        const dashArray = radius * Math.PI * 2      
        const dashOffset = dashArray - dashArray * this.props.percentage / 100  
        return (
            <Svg
                width={this.props.sqSize}
                height={this.props.sqSize}
                viewBox={viewBox}>
                <BgCircle              
                    cx={this.props.sqSize / 2}
                    cy={this.props.sqSize / 2}
                    r={radius}
                    strokeWidth={`${this.props.strokeWidth}px`} />
                <FgCircle              
                    cx={this.props.sqSize / 2}
                    cy={this.props.sqSize / 2}
                    r={radius}
                    strokeWidth={`${this.props.strokeWidth}px`}              
                    transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }} />
                <Text             
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle">
                    {`${this.props.percentage}%`}
                </Text>
            </Svg>
        )
    }
}

export default CircularProgressBar