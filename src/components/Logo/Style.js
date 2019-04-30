import styled from 'styled-components'

export const Heading = styled.a`
    
    padding: 50px 0;
    @media(max-width:592px){
        margin-left: -20px;
    }   
`
export const Img = styled.img`
    width: 250px;
    @media(max-width:492px){
        width: 42vw;
    }

    &.logo {
        &:hover {
            cursor: pointer;
        }
    }
    position: relative;
    top: 0px;

    &.animation { 
        animation: down 0.3s 1; 
    }    
    @keyframes down {
        0% {
            top: 0px;
            opacity: 1;
        }
        100% {
            top: 10px;
            opacity: 0;
        }
    }                  
    
`