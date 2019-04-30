import styled from 'styled-components';

export const Svg = styled.svg`
    @media(max-width:767px){
        width: 18.2vw;
    }
    @media(max-width:592px){
        width: 25vw;
    }
`
export const FgCircle = styled.circle`
    fill: none;
    stroke: #79cc90;
    transition: 2s;
`
export const BgCircle = styled.circle`
    fill: none;
    stroke: none;
`
export const Text = styled.text`
    font-size: 25px;
    fill: #000;

    @media(max-width:592px){
        font-size: 6.5vw;
    }
    @media(max-width:392px){
        font-size: 10vw;
    }
`