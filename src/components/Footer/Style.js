import styled from 'styled-components'
import Images from '../../themes/images'

export const Container = styled.footer`
    background: url(${Images.triangle}) no-repeat center center;
    background-size: cover;
    color: #333;
    margin: auto;
    max-width: 800px;    
    text-align: center;
    height: 570px;
    justify-content: center;    
    ${props =>props.safari ? '-webkit-filter: grayscale(0);':''}

    @media(min-width: 768px) {
        height: 550px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media(max-width:592px){
        height: 450px;
    }  
    @media(max-width:392px){
        height: 275px;
    }    
`

export const Logo = styled.img`
    width: 280px;
    margin-top: 90px;
    @media(max-width:767px){
        width: 240px;
        margin-top: 160px;
    }
    @media(max-width:592px){
        width: 200px; 
        margin-top: 120px;         
    }  
    @media(max-width:392px){
        width: 120px;  
        margin-top:60px;      
    }    
`

export const List = styled.ul`  
    display: none;

    @media(min-width: 593px) {
        flex-direction: column;
        align-items: center;
        display: block;
        display: flex;
        list-style: none;
        justify-content: center;
        margin-top: 30px;        
        padding: 0;
    }
`

export const MobileList = styled.ul`
    display: none; 
    @media (max-width: 592px) {
        display: flex;
        flex-direction: column;
        list-style: none;
        justify-content: center;
        margin-top: 15px;
        padding: 0;
        display: block;
    }
    @media(max-width:392px){
        margin-top: 0;
    }      
`

export const ListItems = styled.li`
    @media(min-width:593px){        
        ${props =>props.social ? 'padding: 0;': 'padding: 40px 20px;'}        
    }
    ${props =>props.social ? '@media(max-width: 592px){padding: 20px 5px;}': 'padding: 5px 20px;'}
`

export const Link = styled.a`
    color: #333;
    text-decoration: none;    
    font-size: 23px;   
    ${props =>props.social ? '':'margin: 0 15px;'}

    img {
        width: 60px;
    }

    &:hover, &:focus {        
        cursor: pointer;
        color: #999;
        text-decoration: underline;
    }
    @media(max-width: 767px) {
        ${props =>props.social ? '':'margin: 5px 15px; font-size: 20px;'}
    }
    @media(max-width: 392px) {
        ${props =>props.social ? 'img { width: 40px;}':'margin: 5px 15px; font-size: 15px;'}
    }
`