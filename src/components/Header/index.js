import React from 'react'
import Logo from '../Logo'
import NavBar from '../NavBar'
import Progress from '../Progress'
import Model from '../Model'
import { 
    Container, 
    Wrapper, 
    ModelWrapper,
    ProgressWrapper } from './Style'

export default ({landing, percent, visible, edit}) => {    
    return (
        <Container percent={percent}>
            <Wrapper landing={landing} percent={percent}>
                <Logo />                
                <Progress visible={visible} percent={percent}/>                
                <NavBar landing={landing} edit={edit}/>            
            </Wrapper>
            <ProgressWrapper mobile>
                <Progress visible={visible} percent={percent}/>
            </ProgressWrapper>
            <ModelWrapper landing={landing}>
                <Model />
            </ModelWrapper>
        </Container>
    )
}