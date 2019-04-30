import styled from 'styled-components'

export const Wrapper = styled.div`
    border: 1px solid #FFF;
    background-color: #E3F5E9;    
    border-radius: 50px;
    padding: 10px 30px;
    font-size: 16px;        
    margin: 7px 10px 7px 0;
    text-transform: capitalize;
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
`
export const Icon = styled.img`
    padding-left: 15px;
    width: 13px;
`