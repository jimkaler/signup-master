import styled from 'styled-components'
import { isMobile } from 'react-device-detect';

export const Wrapper = styled.div`  
`
export const Content = styled.div`
   text-align: center;
`

export const Heading = styled.h1`
    margin: 90px 0;
    font-size: 65px;        
    font-weight: 400;    

    @media(max-width: 1023px){ font-size: 55px;}
    @media(max-width: 892px){ margin: 120px 0 90px 0;}
    @media(max-width: 767px){ font-size: 45px;}
    @media(max-width:592px){
        margin: 20.2vw auto 15.2vw;
    }
    @media(max-width: 462px){ font-size: 35px; font-weight: 700}  
    @media(max-width:392px){
        margin: 80px auto 40px;
    }  
`
export const FieldWrapper = styled.div`
    margin: 80px auto 0;
    max-width: 700px;
    text-align: center;
    @media(max-width: 767px){ margin: ${props =>props.tech ? '80px auto 0;':'80px auto;'}}
    @media(max-width: 462px){ margin: ${props =>props.tech ? '80px auto 0;':'65px auto;'}}
    @media(max-width: 392px){ margin: ${props =>props.tech ? '80px auto 0;':'50px auto;'}}
`
export const SubHeading = styled.p`
    margin-bottom: 0px;
    ${props =>props.small ? 'font-size:16px; margin-bottom: 30px; color: #272525;':'font-size:32px; color: #333;'}        

    @media(max-width:767px){
         font-size: ${props =>props.small ? '':'27px;'}
    }
    @media(max-width:462px){
        font-size: ${props =>props.small ? '16px':'24px;'}
        font-weight: 700;
    }
    @media(max-width:392px){
        font-size: ${props =>props.small ? '14px':'20px;'}
        font-weight: 700;
        width: 70%;
        margin-left: 15%;
    }
    &:hover {
        span {
            cursor: pointer;
        }
    }
`
export const ButtonWrapper = styled.div`
    margin: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
`

export const Button = styled.a`
    border: 1px solid #FFF;
    ${props =>props.active ? 'background-color: #79cc90;color: #FFF;' : 'background-color: #E3F5E9;'}
    border-radius: 50px;
    padding: 10px 30px;
    font-size: 16px;    
    margin: 7px 10px;
    transition: 0.5s;
    -webkit-transition: 0.5s;

    &:hover, &:focus {
        background-color: #79cc90;
        color: #FFF;
        cursor: pointer;
    }
    @media(max-width:767px){
        font-size: 15px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
    img {
        width: 15px;
        margin-left: 15px;
    }
`
export const RadioButton = styled.label`
    border: 1px solid #FFF;
    ${props =>props.active ? 'background-color: #79cc90;color: #FFF;' : 'background-color: #E3F5E9;'}
    border-radius: 50px;
    padding: 10px 30px;
    font-size: 16px;    
    margin: 7px 10px;
    transition: 0.5s;
    -webkit-transition: 0.5s;

    input {
        display: none;
    }
    
    &:hover, &:focus {
        background-color: #79cc90;
        color: #FFF;
        cursor: pointer;
    }
    @media(max-width:767px){
        font-size: 15px;
        align-items: center;
        display: flex;
        justify-content: center;

    }
`
export const Input = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        width: 450px !important;
        font-size: 23px !important;
        font-family: 'NudistaLight' !important;
    }
    label {
        font-size: 23px;        
    }
    input {
        color: #333 !important;
    }
    @media(max-width: 767px){
        div {
            ${props =>props.place ? 'width: 100% !important;':'width: 100% !important;'}
            font-size: 17px !important;
        }
        label {
            font-size:17px
        }
    }
    @media(max-width: 592px){         
        div {
            ${props =>props.place ? 'width: 100% !important;':'width: 100% !important;'}                
        }
    }
`
export const AutoSuggest = styled.div`
    width: 540px;
    display: flex;
    margin: -25px auto;
    @media(max-width: 767px){
        width: calc(50% + 90px);
    }
    @media(max-width: 592px){
        width: calc(60% + 90px);
    }
    p {
        color: #30ae1f;        
        ${props =>props.active ? 'background-color:#09e910;color:#fff;border-radius:15px;padding:5px;':''}
    }
`
export const UnderLine = styled.hr`
    width: 450px;
    border-top: 1px solid #c7c2c2;    
    margin-top: 0px;

    @media(max-width: 767px){    
        ${props =>props.place ? 'width: 100%;':'width: 100%;'}
    }
    @media(max-width: 592px){    
        ${props =>props.place ? 'width: 100%;':'width: 100%;'}
    }
`
export const TagWrapper = styled.div`
    margin: ${props =>props.tech ? '40px auto 0;':'70px auto 0;'}
    max-width: 700px;
    text-align: center;
`
export const Navigation = styled.div`
    padding: 60px 0 110px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const PrevButton = styled.a`
    border: 1px solid #fff;
    border-color:#c7c2c2; 
    background-color: transparent; 
    padding: 20px 25px; 
    border-radius: 50px;        
    font-size: 25px;
    color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    transition: 0.5s;
    -webkit-transition: 0.5s;

    @media(max-width:767px){
        padding: 15px 20px;
    }
    @media(max-width:392px){
        font-size: 20px;
        padding: 10px 15px';
    }
    &:hover {
        cursor: pointer;
        background-color: #eff5f4;
    }
`
export const NextButton = styled.button`
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    background-color: #79cc90; 
    padding: 20px 95px;     
    border-radius: 50px;        
    font-size: 35px;
    color: #fff;
    font-weight: 700;
    margin: 0 10px;
    font-family: 'NudistaBold' !important;
    transition: 0.5s;
    -webkit-transition: 0.5s;
    outline: none;

    @media(max-width:767px){
        padding: 15px 80px;
    }
    @media(max-width:645px){
        padding: 15px 12vw;
        font-size: 26px;
    }
    @media(max-width:392px){
        padding: 14px 10vw;
        font-size: 20px;
    }
    &:hover {
        cursor: pointer;
        background-color: #4cbf69;
    }
`
export const NavigationButton = styled.a`
    border: 1px solid #fff;
    background-color: #79cc90; 
    padding: 20px 95px;     
    border-radius: 50px;        
    font-size: 25px;
    color: #fff;
    font-family: 'NudistaBold' !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    transition: 0.5s;
    -webkit-transition: 0.5s;

    @media(max-width:767px){
    padding: 15px 80px;
    }
    @media(max-width:645px){
    padding: 15px 12vw;
    }
    @media(max-width:392px){
        font-size: 20px;
        padding: 10px 10vw;
    }
    &:hover {
        ${props =>props.inactive ? '':'cursor: pointer;background-color: #4cbf69;'}                
    }
`
export const Img = styled.img`
    width: 60px; 
    ${props =>props.right ? 'padding-left:10px;':''}  
    @media(max-width:645px){
        width: 45px;
    } 
    @media(max-width:392px){
        width: 35px;
    } 
`
export const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center; 
    
    @media(max-width: 592px){
        ${props =>props.place ? '':'flex-direction: column;'}
    }
`
export const TextFieldWrapper = styled.div`
    @media(max-width: 767px){
        width: 50%;
    }
    @media(max-width: 592px){
        ${props =>props.place ? 'width: 60%':'width: 80%;'}        
    }
`
export const AddButton = styled.a`
    border: 1px solid #a9a9a9;
    font-size: 17px;
    color: #c7c2c2;
    border-radius: 50px;
    padding: 10px 30px;
    margin-top: 10px;
    transition: 0.2s;
    -webkit-transition: 0.2s;
    ${props =>props.active ? 'cursor: pointer;color: #fff; background-color: #333;': ''}        
  
    @media(max-width: 592px){
        margin-top: 15px;
    }
`
export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 0 0;    
`
export const SocialImg = styled.img`
    opacity: 0.6;
    ${props =>props.git? 'opacity:1;':''}
    ${props =>props.google? 'opacity:1;':''}
    ${props =>props.facebook? 'opacity:1;':''}
    ${props =>props.linkedin? 'opacity:1;':''}
    ${props =>props.behance? 'opacity:1;':''}
    margin: 0 10px;
    width: 80px !important;
    @media(max-width:767px){
        width: 65px !important;
        margin: 0 1vw;
    }
    @media(max-width:392px){
        width: 16.5vw !important;
        margin: 0;
    }
`
export const FormWrapper = styled.div`
    margin: 35px auto 0;
    max-width: 700px;
    text-align: center;
`
export const FormButtonWrapper = styled.div`
    margin: 40px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    @media(max-width:592px){
        margin: 40px 10% 0;
        width: 80%;
    }
`

export const FormButton = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #FFF;
    ${props =>props.active ? 'background-color: #79cc90;color: #FFF;' : 'background-color: #E3F5E9;'}
    border-radius: 50px;
    padding: 10px 30px;
    font-size: 16px;    
    margin: 7px 10px;
    transition: 0.5s;
    -webkit-transition: 0.5s;

    input {
        display: none;
    }
    &:hover, &:focus {                
        ${isMobile ? '':'background-color: #79cc90;color: #FFF;'}
        cursor: pointer;
    }
    @media(max-width:767px){
        font-size: 15px;
        align-items: center;
        display: flex;        
        justify-content: center;
        padding: 10px 30px;        
    }
    img {
        width: 15px;
        margin-left: 15px;
    }
`
export const ToggleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;        
    p {
        font-size: 25px;
        color: #333;
        margin-right: 15px;
    }
    div {
        margin-right: 15px;
        background-color: #E3F5E9 !important;
        border-color: #E3F5E9 !important;
        border: none !important;        
        &.switch.on {
            background-color: #E3F5E9 !important;
        }  
        div {            
            border-color: #79cc90 !important;
            box-shadow: none !important;
            background-color: #79cc90 !important; 
            height: 26px !important;
            width: 26px !important;       
        }
    }
    @media(max-width: 767px){
        p { font-size: 3.2vw }
    }
    @media(max-width: 592px){
        p { font-size: 5vw }
    }
    @media(max-width:392px){
        p { font-size: 6vw;}
    }
`