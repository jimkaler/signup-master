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
    margin: 0 auto 70px;
    max-width: 800px;   
    flex-wrap: wrap;

    @media(max-width:1124px){
        margin-left: 12vw;
        max-width: 75vw;
    }
    @media(max-width:592px){  
        margin-top: 10vw;      
    }
`
export const Q = styled.p`
    font-size: 17px;    
    color: #4cbf69;    
    line-height: 25px;
    @media(max-width:392px){        
        font-size: 15px;        
    }
`
export const A = styled.p`
    font-size: 17px;
    line-height: 25px;
    color: #333;    
    margin-top: -15px;
    text-align: justify;
    @media(max-width:392px){        
        font-size: 15px;        
    }
`