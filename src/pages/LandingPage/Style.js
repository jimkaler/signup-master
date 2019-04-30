import styled from 'styled-components';
import Images from '../../themes/images'

export const Wrapper = styled.div`
    background: -webkit-linear-gradient(top,rgba(54, 193, 93, 0.5) 0%,rgba(64, 7, 61, 0.75) 80%), url(${Images.background}) top center no-repeat;
    background-size: cover;
    color: #fff;
    font-weight: 300;
    margin-top: -10px;
    height: 1000px;
    text-align: center;
    @media(max-width:767px){
        height: 750px;
    }
`