import styled from 'styled-components'

export const Wrapper = styled.div`  

`
export const Heading = styled.h1`
    margin: 90px 0 60px 12vw;
    font-size: 65px;        
    font-weight: 400;  
    text-algin: left;  

    @media(max-width: 767px){ font-size: 8.4vw;}
    @media(max-width: 592px){ 
        text-align: center;
        margin: 15.2vw auto 10vw;
    }
    @media(max-width: 392px){ 
        font-size: 32px;
        text-align:center;
        margin: 60px auto 40px;
        font-weight: 700
    }    
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
    P:nth-of-type(2) {
        margin-top: -15px;
    }
    a {
        color: #4cbf69;
        font-size: 17px;
        line-height: 50px;
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
export const MapContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px auto;   
    div {
        div:nth-of-type(2) {
            display: none !important;
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
    margin: 90px auto 60px;
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