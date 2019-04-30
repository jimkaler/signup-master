import React, { Component } from 'react'
import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl"

import Images from '../../themes/images'

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibW9iaWxlZGV2Nzc1IiwiYSI6ImNqNXFyMnBhczBvM3kyd211M3dtZTh4ejQifQ.DA8_iVN0ijZKD4plfd-pOw",
    scrollZoom: false    
})

const style = {
    containerStyle: {
        height: '50vh',
        width: '70vw'
    },
    imgStyle: {
        width: '50px',
        height: '50px'
    }
}

class MapView extends Component {
    render() {
        return (
            <Map 
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={style.containerStyle}
                center={[12.5866593, 55.6795204]}
                zoom={[15]}
            >  
                <Marker
                    coordinates={[12.5866593, 55.6795204]}
                    anchor="top"
                >
                    <img src={Images.marker} alt="marker" style={style.imgStyle}/>
                </Marker>              
                <Layer>
                    <Feature coordinates={[12.5866593, 55.6795204]}/>
                </Layer>
            </Map>
        )
    }
}

export default MapView
