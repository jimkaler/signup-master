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
    margin: 0 auto 30px;
    max-width: 800px;   
    flex-wrap: wrap;
    h1 {
        color: #4f81bd;
    }
    p {
        font-size: 17px;
        line-height: 25px;
        color: #333;
        margin: auto 0;   
        text-align: justify;     
    }
    span {
        color: #4cbf69;
        font-size: 17px
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
        h1 {
            font-size: 6vw;            
        }
    }
    @media(max-width:392px){
        p, span {
            font-size: 15px;
        }
    }
`