import React from 'react'
import { browserHistory } from 'react-router'
import { detect } from 'detect-browser'
import { 
    Container, 
    Logo, 
    List, 
    ListItems, 
    Link, 
    MobileList } from './Style'
import Images from '../../themes/images'
import { autoScrolling } from '../../jquery';

const browser = detect()

class Footer extends React.Component {

    gotoPage = (path) => {
        browserHistory.push(path);
        autoScrolling()
    }

    render() {        
        return (
            <Container safari={browser.name === 'safari'}>
                <Logo src={Images.logo_footer} alt="footer" />
                <List>
                    <ListItems>
                        <Link onClick={() =>this.gotoPage('/home')}>Home</Link>
                        <Link onClick={() =>this.gotoPage('/about')}>About</Link>
                        <Link onClick={() =>this.gotoPage('/contact')}>Contact</Link>
                        <Link onClick={() =>this.gotoPage('/faq')}>FAQ</Link>
                        <Link onClick={() =>this.gotoPage('/privacy')}>Privacy and GDPR</Link>
                    </ListItems>
                    <ListItems social>
                        <Link social onClick={() =>window.open('https://www.linkedin.com/company/agentify/','_blank')}><img src={Images.linkedin_home} alt="linkedin"/></Link>
                        <Link social onClick={() =>window.open('https://www.facebook.com/agentify.me/','_blank')}><img src={Images.facebook_home} alt="facebook"/></Link>
                    </ListItems>
                </List>
                <MobileList>
                    <ListItems>
                        <Link onClick={() =>this.gotoPage('/home')}>Home</Link>
                        <Link onClick={() =>this.gotoPage('/about')}>About</Link>
                        <Link onClick={() =>this.gotoPage('/contact')}>Contact</Link>
                        <Link onClick={() =>this.gotoPage('/faq')}>FAQ</Link>
                    </ListItems>
                    <ListItems><Link onClick={() =>this.gotoPage('/privacy')}>Privacy and GDPR</Link></ListItems>
                    <ListItems social>
                        <Link social onClick={() =>window.open('https://www.linkedin.com/company/agentify/','_blank')}><img src={Images.linkedin_home} alt="linkedin"/></Link>
                        <Link social onClick={() =>window.open('https://www.facebook.com/agentify.me/','_blank')}><img src={Images.facebook_home} alt="facebook"/></Link>
                    </ListItems>
                </MobileList>
            </Container>
        )
    }
}

export default Footer