import styled from 'styled-components'

export const Wrapper = styled.div`  
`
export const Content = styled.div`
   text-align: center;
`
export const Heading = styled.h1`
    font-size: 65px;            
    margin: 90px 0;

    @media(max-width: 1023px){ font-size: 55px;}
    @media(max-width: 892px){ margin: 120px 0 90px 0;}
    @media(max-width: 767px){ font-size: 45px;}
    @media(max-width:592px){
        margin: 20.2vw auto 15.2vw;
    }
    @media(max-width: 392px){ font-size: 11.5vw; font-weight:700;  margin: 80px auto 40px;}
`
export const ButtonWrapper = styled.div`
    ${props =>props.signup ? 'margin: 50px 0;':'margin: 50px 0 35px;'}
    display: flex;
    justify-content: center;    
    
    @media(max-width: 767px){        
        flex-direction: column;
        align-items: center; 
        ${props =>props.signup ? '':'margin: 50px 0 35px;'}       
    }
`
export const SpinWrapper = styled.div`
    margin: 105px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SocialButton =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    
    margin: 0 1.4vw;
    height: 70px;
    width: 400px;
    font-size: 25px;
    border-radius: 50px;
    background-color: ${props =>props.google ? '#ecebeb;':'#3b5998;'}
    p { 
        margin-left: 5px; 
        font-weight: 700;
        color: ${props =>props.google ? '#333;':'#fff;'}
    }
    img {
         margin-right: 5px;
         width: ${props =>props.google ? '60px;':'45px;'}         
    }

    &:hover { cursor: pointer;}

    @media(max-width:1023px){        
        font-size: 2.5vw;
        height: 60px;
        width: 39vw;
        margin: 0 2vw;
        img {
            width: ${props =>props.google ? '45px;':'35px;'}   
        }
    }
    @media(max-width:767px){
        font-size: 20px;
        width: 350px;
        margin-bottom: 30px;
    }
    @media(max-width: 392px){
         font-size: 17px; 
         width: 90vw;
    }
`
export const CircleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid #c7c2c2;
    border-radius: 50px;
    margin: auto;
    margin-bottom: 45px;
    font-size: 18px;
    font-weight: 700;
`
export const Text = styled.p`
    color: #f7be28;
    font-size: 23px;   
    @media(max-width: 392px){
        font-size: 20px;
    } 
`
export const Form = styled.div`    
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        width: 810px !important;
        font-size: 23px !important;
        font-family: 'NudistaLight' !important;
    }
    label {
        font-size: 23px; 
        ${props =>props.error ? 'color:#f7be28 !important':''}       
    }
    input {
        color: #333 !important;        
    }
    @media(max-width: 1023px){
        div {
            width: 700px !important;
        }
    }
    @media(max-width: 767px){
        div {
            width: calc(90% - 40px) !important;
        }
    }
    @media(max-width: 392px){
        div {            
            width: 82% !important;
            font-size: 20px !important;
        }
        label {
            font-size:17px
        }
    }    
`
export const UnderLine = styled.hr`
    width: 850px;
    border-top: ${props =>props.error ? '1px solid #f7be28;':'1px solid #c7c2c2;'}

    @media(max-width: 1023px){
        width: 735px;
    }
    @media(max-width: 767px){
        width: 90%;
    }
    @media(max-width: 392px){
        margin-top: 0;
    }
`
export const Img = styled.img` 
    margin-top: 30px;
    width: 40px;
    @media(max-width: 392px){ 
       width: 8vw;
    }
`
export const SignUpButton = styled.a`
    ${props =>props.active ? 'background-color: #4cbf69;':'background-color: #f7be28;'}
    padding: 20px 80px;    
    color: #FFF;
    font-size: 25px;
    font-family: 'NudistaBold' !important;
    border-radius: 50px;    
    transition: 0.5s;
    -webkit-transition: 0.5s;

    &:hover {
        cursor: pointer;
        ${props =>props.active ? 'background-color: #67c77f;':'background-color: #f5c64d;'}
    }
    @media(max-width: 1023px){ padding: 17px 80px;}
    @media(max-width: 392px){ font-size: 20px;}
`