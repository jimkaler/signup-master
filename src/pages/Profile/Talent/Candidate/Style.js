import styled from 'styled-components'
import Images from '../../../../themes/images'

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
export const UserWrapper = styled.div`
    margin-left: 12vw;
    display: flex;    
    align-items: center;

    @media(max-width:592px){
        flex-direction: column;
        margin: auto;
    }
`
export const Avatar = styled.img`
    color: rgb(255, 255, 255);
    background-color: rgb(188, 188, 188);
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 50%;
    height: 250px;
    width: 250px;

    @media(max-width:767px){
        width: 32vw;
        height: 32vw;
    }
    @media(max-width:592px){
        width: 40vw;
        height: 40vw;
    }
    @media(max-width:392px){
        width: 50vw;
        height: 50vw;
    }
`
export const User = styled.div`
    margin-left: 70px;
    h1 { 
        color: #333;
        font-weight: normal;
    }
    p, span {
        font-size: 25px;
    }    
    @media(max-width: 767px){
        margin-left: 8.5vw;
        h1 { font-size: 4.2vw }
        p { font-size: 3.2vw }
    }
    @media(max-width: 592px){  
        margin: 4vw 0 0;      
        h1 { font-size: 6vw; }
        p { font-size: 5vw; line-height: 3vw; }
    }
    @media(max-width:392px){
        margin: 15px 0 0;
        h1 {
            font-size: 7vw;
        }
        p {
            font-size: 6vw
        }
    }
`
export const ToggleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    float: left;    
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
export const DetailWrapper = styled.div`     
    margin: 30px 0 0 12vw;
    display: flex;

    @media(max-width:592px){
        flex-direction: column;
        margin: 30px 0 0;
    }
`
export const CircleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 

    @media(min-width:768px){
        margin: 20px 40px 10px;
    }
`
export const BgCircle = styled.div`
    background-color: #E3F5E9;
    border-radius: 100px;
    display: flex;
    justify-content: center;  
    align-items: center;  
    width: 170px;
    height: 170px;

    @media(max-width:767px){
        width: 22.2vw;
        height: 22.2vw;
        margin: 20px 5vw 0;
    }
    @media(max-width:592px){
        width: 30vw;
        height: 30vw;
        margin: 0;
    }
`
export const Detail = styled.div`
    // input {
    //     background: #dee8da !important;
    // }
    margin-left: 70px;
    h1 { 
        color: #333;
        font-weight: normal;
    }
    div {
        display: flex;
        div {
            display: flex;
            flex-direction: column;
        }
        div:first-child {
            margin-right: 50px;
            @media(max-width:767px){
                margin-right: 3vw;
            }
        }
        p {
            font-size: 15px;
            line-height: 3px;
            color: #333;            
            @media(max-width: 767px){
                font-size: 2vw;
            }
            @media(max-width:592px){
                font-size: 2.5vw;
            }
        }
        div {
            div {
                font-size: 15px !important;               
                height: 33px !important;
                width: 210px !important;
                @media(max-width: 767px){
                    font-size: 2vw !important;
                    height: 4.3vw !important;
                }
                @media(max-width:592px){
                    font-size: 2.5vw !important;
                    height: 5.3vw !important;
                    width: 35.4vw !important;
                }
                @media(max-width:392px){                    
                    width: 49.5vw !important;
                }
            }
        }        
    }
    @media(max-width: 767px){
        margin-left: 8.5vw;        
        h1 {
            font-size: 4.2vw;
        }                     
    }
    @media(max-width:592px){
        margin-left: 0;
        text-align: center;
        div {
            justify-content: center;
            div { 
                justify-content: center;                   
            }
            div:last-child {
                text-align: left;
            } 
        }
        h1 {
            font-size: 6vw;
        }
    }
    @media(max-width:392px){
        
        div {
            p {
                font-size: 3.5vw;
            }
            div {
                div {
                    font-size: 3.5vw !important;
                    height: 7.3vw !important;
                }
            }
        }
    }
`
export const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 800px;
    h1 { 
        color: #333;
        font-weight: normal;
    }
    div {
        display: flex;       
        margin-top: 10px; 
        div:first-child {
            display: flex;
            flex-direction: column;
            margin-right: 30px;
            img {
                width: 45px;
                height: 45px;  
                margin-bottom: 15px; 
                @media(max-width:592px){
                    width: 10vw;
                    height: 10vw;                    
                }           
            }
            @media(max-width:592px){
                margin-right: 5vw;
            }
        }
        div:last-child {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            p {
                margin-bottom: 25px;
            }
            @media(max-width:592px){
                p {
                    font-size: 4vw;
                    margin-bottom: 20px;
                }
            } 
        }
    }
    @media(max-width:1124px){
        margin-left: 12vw;
        margin-top: 5vw;
    }
    @media(max-width:767px){
        h1 {
            font-size: 4.2vw;
        }
    }
    @media(max-width:592px){  
        margin-left: 8vw;
        max-width: 80vw;  
        margin-top: 10vw;      
        h1 {
            font-size: 6vw;            
        }
    }
`

export const TagWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 70px auto;
    max-width: 800px;
    h1 { 
        color: #333;
        font-weight: normal;
    }
    @media(max-width:1124px){
        margin-left: 12vw;
    }
    @media(max-width:767px){
        h1 {
            font-size: 4.2vw;
        }
    }
    @media(max-width:592px){  
        margin-top: 10vw;  
        max-width: 85vw;
        margin-left: 8vw;
        h1 {
            font-size: 6vw;            
        }
    }
`
export const Slider = styled.div`
    display: flex;
    flex-direction: column;
    margin: 70px auto;
    max-width: 800px;
    width: 90% !important;
    h1 { 
        color: #333;
        font-weight: normal;
    }
    > div: nth-of-type(1) {
        margin: 60px 0;
    }
    div {        
        .input-range__label--min {
            visibility: hidden;
        }
        .input-range__label--max {
            visibility: hidden;
        }
        .input-range__track {
            background: #E3F5E9;
            height: 13px;
        }
        .input-range__track:first-child {
            border-radius: 0px;
        }
        .input-range__track--active {
            background: #79cc90;
        }
        .input-range__slider {            
            background: url(${Images.slider});
            width: 26px;
            height: 40px;
            border: none;
            border-radius: 0;
            outline: none;
            margin: -55px 0 0 -13px;  
            &:active {
                transform: scale(1.1);
            }          
        }    
        .input-range__label {
            color: black;
            font-family: 'NudistaLight';
        }
        .input-range__label--value {
            top: 1.5rem;
        }
        .input-range__label-container {
            background-color: #E3F5E9;
            border-radius: 25px;
            display: flex;
            justify-content: center;
            width: 130px;
            height: 23px;            
            padding-top: 10px;
            font-size: 15px;            
        }
    }
    @media(max-width:1124px){
        margin-left: 12vw;
        max-width: 75vw;
    }
    @media(max-width:767px){
        h1 {
            font-size: 4.2vw;
        }
    }
    @media(max-width:592px){  
        margin-top: 10vw;  
        margin-left: 8vw;
        max-width: 80vw;    
        h1 {
            font-size: 6vw;            
        }
    }
`
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin: 70px auto;
    max-width: 800px;   
    flex-wrap: wrap;
    h1 { 
        color: #333;
        font-weight: normal;
    }

    p {
        font-size: 17px;
        line-height: 25px;
        color: #333;
        margin: auto;

        @media(max-width:392px){
            font-size: 15px;
        }
    }
    @media(max-width:1124px){
        margin-left: 12vw;
        max-width: 75vw;
    }
    @media(max-width:767px){
        h1 {
            font-size: 4.2vw;
        }
    }
    @media(max-width:592px){  
        margin-top: 10vw;  
        margin-left: 8vw;
        max-width: 80vw;      
        h1 {
            font-size: 6vw;            
        }
    }
`
export const Contact = styled.div`
    display: flex;
    margin: 70px auto;
    max-width: 800px;
    flex-wrap: wrap;

    a {
        padding: 20px 80px;    
        color: #FFF;
        font-size: 25px;
        font-family: 'NudistaBold' !important;
        border-radius: 50px;        
        background-color: #79cc90;
        transition: 0.5s;
        -webkit-transition: 0.5s;
    
        &:hover {
            cursor: pointer;
            background-color: #67c77f;
        }
        @media(max-width: 1023px){ padding: 17px 80px;}
        @media(max-width: 478px){ 
            padding: 15px 15vw;
            font-size: 6vw;
        }
    }
    @media(max-width:1124px){
        margin-left: 12vw;
    }
    @media(max-width:592px){
        margin-left: 8vw;
    }
`