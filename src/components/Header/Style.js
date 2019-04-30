import styled from 'styled-components'

export const Container = styled.div`
        
`

export const Wrapper = styled.div`
    ${props => props.landing ? 'background: transparent' : 'background: -webkit-linear-gradient(left, #79cc90 0%,#7f3b7c 100%); margin-top:-10px;'};
    display: flex;
    justify-content: space-between;
    padding: 0 35px;

    @media(max-width:892px){
        ${props => props.percent ? 'padding-bottom: 40px;justify-content: space-between;align-items: center;'
            :''}        
        ${props => props.percent ? '> div:nth-of-type(1){display: none;}': ''};
    }
`
export const ModelWrapper = styled.div`
    display: none;
    float: right;
    @media(max-width:700px){
        ${props =>props.landing ? 'display: block':''}
    }
    
`
export const ProgressWrapper = styled.div`
    display: none;
    @media(max-width: 892px){
        display: block;
    }
`