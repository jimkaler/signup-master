import styled from 'styled-components'

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    @media(max-width:592px){
        margin-right: -25px;
    }
`
export const ModelWrapper = styled.div`
    ${props =>props.landing ? '' : 'display: none;'}
    @media(max-width:700px){
        display:none;
    }
`
export const SaveButton = styled.a`
    ${props =>props.save ? '':'display:none;'}
    border: 1px solid #fff;
    color: #fff;
    border-radius: 50px;
    padding: 10px 30px;
    background-color: transparent;
    margin-right: 12px;
    @media(max-width:992px){
        margin-right: 0;
    }
    @media(max-width:462px){
        padding: 7px 20px;
    }
    @media(max-width:392px){
        padding: 5px 15px;
        font-size: 12px;
    }
    &:hover {
        cursor: pointer;
    }
`
export const EditButton = styled.a`
    ${props =>props.edit ? '':'display:none;'}
    border: 1px solid #fff;
    color: #fff;
    border-radius: 50px;
    padding: 10px 30px;
    background-color: ${props =>props.flag ? '#333;':'transparent;'}
    margin-right: 12px;
    @media(max-width:572px){
        margin-right: 0;
    }
    @media(max-width:462px){
        padding: 7px 20px;
    }
    @media(max-width:392px){
        padding: 5px 15px;
        font-size: 12px;
    }
    &:hover {
        cursor: pointer;
        background-color: ${props =>props.flag ? 'transparent;':'#333;'}
    }
`

export const Menu = styled.div`
    display: flex;
    margin-right: 7px;    
    img {
        width: 50px;
        height: 50px;
    }
    img: last-child {
        display: none;
    }
    &:hover {
        img: first-child {
            display: none;
        }
        img: last-child {
            display: block;
        }
    }
    @media(max-width:992px){
        ${props =>props.save? 'display:none':''}        
    }
    @media(max-width:572px){
        ${props =>props.edit? 'display:none':''}
    }
    @media(max-width:392px){
        margin-right: 5px;
        img {
            width: 40px;
            height: 40px;
        }
    }
`
export const MobileMenu = styled.div`
    display: flex;
    margin-right: 7px;    
    img {
        width: 50px;
        height: 50px;
    }
    @media(max-width:992px){
        ${props =>props.save? 'display:none':''}        
    }
    @media(max-width:572px){
        ${props =>props.edit? 'display:none':''}
    }
    @media(max-width:392px){
        margin-right: 5px;
        img {
            width: 40px;
            height: 40px;
        }
    }
`
export const Img = styled.img`
    z-index: 10;
    width: 42px;
    margin-right: 15px;
    &:hover {
        cursor: pointer;
    }
    @media(max-width:392px){        
        width: 33px;        
    }
`
export const Nav = styled.ul`
    align-items: center;
    background: #7F3B7C;
    bottom: 0;
    color: #fff;
    display: none;
    font-size: 32px;
    justify-content: center;
    left: 0;
    list-style: none;
    margin: 0 0 0 -40px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;

    &.active {
        display: flex;
        flex-direction: column;
    }

    li {
        padding: 10px 0;
        a {
            color: #fff;
            text-decoration: none;
            transition: opacity 0.5s;
            -webkit-transition: opacity 0.5s;

            &:hover, &:focus {
                cursor: pointer;
                opacity: 0.5
            }            
        }
    }
    @media(max-width:392px){
        font-size: 8.2vw;
        @media(max-height: 665px) {
            font-size: 5vw;
        }
    }
    @media(max-height: 665px) {
        font-size: 5vh;
        li {
            padding: 1vh 0;
        }
    }
`

export const LoginButton = styled.div`
    display: flex;
    z-index: 10;
    img { 
        width: 50px;
        height: 50px;
    }
    img: last-child {
        display: none;
    }
    &:hover {
        img: first-child {
            display: none;
        }
        img: last-child {
            display: block;
        }
    }
    @media(max-width:992px){
        ${props =>props.save? 'display:none;':''}      
    }  
    @media(max-width:572px){
        ${props =>props.edit? 'display:none;':''}
    }
    @media(max-width:392px){        
        img {
            width: 40px;
            height: 40px;
        }
    }
`
export const MobileLoginButton = styled.div`
    display: flex;
    z-index: 10;
    img { 
        width: 50px;
        height: 50px;
    }   
    @media(max-width:992px){
        ${props =>props.save? 'display:none;':''}      
    }  
    @media(max-width:572px){
        ${props =>props.edit? 'display:none;':''}
    }
    @media(max-width:392px){        
        img {
            width: 40px;
            height: 40px;
        }
    }
`