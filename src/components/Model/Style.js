import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    
    div {
        border-color: #fff;
        &.switch.on {
            background-color: transparent !important;
        }
        div {
            border-color: #fff !important;
            box-shadow: none !important;
        }
    }
    span {
        font-size: 20px;
        margin: 0 20px;
    }

    @media(max-width:700px){
        margin: -35px 15px 0 0;
    }
    @media(max-width:592px){
        margin: -35px 0 0 0;
    }
    @media(max-width:462px){
        margin: -35px 15px 0 0;
        span {
            font-size: 17px;
            margin: 0 7px;
        }
        div {
            width: 40px !important;
            height: 22px !important;
            &.switch.on .switch-toggle {
                left: 18px !important;
            } 
            div {                               
                width: 20px !important;
                height: 20px !important;
            }
        }
    }
`