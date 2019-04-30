import styled from 'styled-components'

export const Wrapper = styled.div`  

`
export const Heading = styled.h1`
    font-size: 65px;            
    margin: 90px 0;
    text-align: center;
    @media(max-width: 1023px){ font-size: 55px;}
    @media(max-width: 892px){ margin: 120px 0 90px 0;}
    @media(max-width: 767px){ font-size: 45px;}
    @media(max-width:592px){
        margin: 20.2vw auto 15.2vw;
    }
    @media(max-width: 392px){ font-size: 11.5vw; font-weight:700;  margin: 80px auto 40px;}
`
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 800px;
    h1 {
        line-height: 0;
    }
    p {
        font-size: 17px;
        line-height: 30px;
    }
    a {
        color: #4cbf69;
        font-size: 17px;
        line-height: 50px;
        &:hover {
            cursor: pointer;
        }
    }
    @media(min-width:592px) and (max-width:1124px){
        margin-left: 12vw;
        max-width: 75vw;
    }
    @media(max-width:767px){
        h1 {
            font-size: 4.2vw;
        }
    }
    @media(max-width:592px){    
        max-width: 250px;
        margin: auto; 
        h1 {
            font-size: 22px;            
        }
    }
`
export const Form = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        width: 800px !important;
        font-size: 23px !important;
        font-family: 'NudistaLight' !important;
        line-height: 30px !important;
    }
    label {
        font-size: 23px;    
    }
    input {
        color: #333 !important;
    }
    @media(max-width: 892px){
        div {
            width: 90% !important;
        }
    }
    @media(max-width: 592px){
        div {
           font-size: 20px !important;
        }
        label {
            font-size: 20px;
        }
    }
    @media(max-width: 392px){
        div {                        
            font-size: 20px !important;
        }
        label {
            font-size:17px
        }
    }    
`
export const UnderLine = styled.hr`
    width: 800px;
    border-top: 1px solid #c7c2c2;

    @media(max-width: 892px){
        width: 90%;
    }
    @media(max-width: 392px){
        margin-top: 0;
    }
`
export const Button = styled.div`
    width: 800px;
    display: flex;
    justify-content: center;
    margin: 100px auto;
    a {
        background-color: #4cbf69;
        padding: 20px 100px;    
        color: #FFF;
        font-size: 25px;
        font-family: 'NudistaBold' !important;
        border-radius: 50px;
        margin: auto;
        transition: 0.5s;
        -webkit-transition: 0.5s;
    
        &:hover {
            cursor: pointer;
            background-color: #67c77f;
        }
        @media(max-width: 1023px){ padding: 17px 80px;}
        @media(max-width: 392px){ font-size: 20px;}
    }
    @media(max-width: 892px){
        width: 90%;
    }
`