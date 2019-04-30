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
    ul { margin-top: 0 }
    p, li {
        font-size: 17px;
        line-height: 25px;
        color: #333;
        margin: auto 0;   
        text-align: justify;
        margin-bottom: 10px;     
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
        p {
            font-size: 15px;
        }
    }
`
export const FieldWrapper = styled.div`
    display: flex;
    margin: 0 0 70px 12vw;
    max-width: 1250px;
    img {
        margin-right: 50px;
    }
    p {
        font-size: 45px;
        color: #4cbf69;
        margin: -10px 0 0 50px;
    }
    @media(max-width:1270px){
        max-width: 930px;
        img {
            width: 600px;
            height: 400px;
            margin-right: 4vw;
        }
        p {
            font-size: 35px;
            margin-right: 4vw;
        }
    }
    @media(max-width:1072px){
        max-width: 825px;
        img {
            width: 460px;
            height: 300px;
            margin-right: 4vw;
        }
        p {
            font-size: 30px;
            margin-right: 4vw;
        }
    }
    @media(max-width:892px){
        display: flex;
        flex-direction: column;
        margin: 0 auto 70px;
        max-width: 75vw;
        
        img {
            width: 75vw;
            height: 45vw;            
        }
        p {
            font-size: 4vw;
            margin: 30px auto 0;
        }
    }
    @media(max-width:592px){
        p {
            font-size: 22px;
        }
    }
`