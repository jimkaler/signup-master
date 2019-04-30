import styled from 'styled-components'
import Images from '../../themes/images'

export const Wrapper = styled.div`
    padding: 9vw 0 10vw 0;
    @media(max-width:1224px){
        padding-top: 160px;
    }

    @media(max-width: 767px) {
        padding: 85px 0 0 0;
    }
`
export const Content = styled.div`
    background: url(${Images.triangle}) no-repeat top;    
    font-size: 22px;
    line-height: 31px;
    margin: auto;
    padding: ${props =>props.employer ? '40px 0 150px 0': '10px 0 150px 0'};    
    filter: grayscale(0);
    position: relative;
    bottom: 30px;

    @media(max-width:892PX){
        padding: 10px 0 150px 0;
    }
    @media(max-width:767px){
        background-size: 75vw;
        background-position: center center;
        padding: 10px 0 150px 0;
        bottom: 60px;
    }
    @media(max-width:592px){
        background-size: 385px;     
        background-size: 95vw;
    }
    @media(max-width:457px){         
        padding: ${props =>props.employer ? '10px 0 120px 0': ''};
        bottom: ${props =>props.employer ? '30px': ''};
    }
    @media(max-width:392px){
        bottom: 60px;
        padding: ${props =>props.employer ? '35px 0 150px 0': '10px 0 150px 0'};
    }
    @media(max-width:350px){
        bottom: 60px;
        padding: ${props =>props.employer ? '60px 0 150px 0': '10px 0 150px 0'};
    }
    @media(max-width:320px){
        bottom: 60px;
        padding: 10px 0 150px 0;
    }
`

export const Heading = styled.h3`    
    font-weight: 300;
    line-height: normal;
    margin:30px 0 35px 0;
    letter-spacing: 2px;

    @media(min-width: 1024px) {
        font-size: 80px;
    }
    @media(min-width:768px) and (max-width:1200px){
        font-size: 6vw;
    }
    @media(min-width: 592px) and (max-width: 767px){
        font-size: 6vw;
    }
    @media(max-width:592px){
        font-size: 32px;
    }
`

export const Text = styled.p`
    font-size: ${props => props.smaller ? '18px' : '22px'};
    margin: ${props => props.smaller ? '0 0 10px' : '35px 0 10px'};
    z-index: 0;
    line-height: 30px;

    @media(min-width:768px) and (max-width:1023px){
        font-size: ${props => props.smaller ? '13px' : '2.5vw'};
    }
    @media(max-width: 767px){
        font-size: ${props => props.smaller ? '13px' : '20px'};
        margin:  ${props => props.smaller ? '': '60px 25px 0 20px'};
        line-height:30px;
    }
    @media(max-width: 392px){
        font-size: ${props => props.smaller ? '12px' : '17px'};
        line-height:25px;
    }
`

export const SignUpLink = styled.a`
    background: #fff;
    border-radius: 35px;
    cursor: pointer;
    display: inline-block;
    font-size: 22px;
    margin-bottom: 15px;
    padding: 20px 80px;
    text-decoration: none;
    font-family: 'NudistaBold' !important;
    font-weight: 700;
    color: #333;
    transition: 0.5s;
    -webkit-transition: 0.5s;

    &:hover, &:focus {
        background: #333;
        color: #fff;
    }
    @media(min-width: 1024px) {
        font-size: 28px;
    }
    @media(min-width:768px) and (max-width:1023px){
        font-size: 3vw;
        padding: 2vw 12vw;
    }
    @media(max-width: 767px) {
        padding: 10px 80px;
    }
    @media(max-width: 392px) {
        padding: 7px 70px;
    }
`

export const Image = styled.img`
    margin-right: 5px;
    position: relative;
    top: 5px;
`
export const Arrow = styled.div`

    @media(max-height:850px){
        img {
            display: none;
        }
    }
    img {
        width:50px;
        position: absolute;
        margin-left: -25px;
        bottom: 0;
        margin-bottom: 40px;
        animation: scrolldown 2s infinite;
    }

    @keyframes scrolldown {
        0% {            
            bottom: 0px;
            opacity: 0.9
        }
        10% {            
            bottom: 3px;
            opacity: 0.8
        }
        20% {            
            bottom: 6px;
            opacity: 0.7
        }
        30% {            
            bottom: 9px;
            opacity: 0.6
        }
        40% {            
            bottom: 12px;
            opacity: 0.5
        }
        50% {            
            bottom: 15px;
            opacity: 0.4
        }       
        100% {            
            bottom: 0px;
            opacity: 1
        }
    }
    @media(max-width:767px){
        display: none;
    }
`