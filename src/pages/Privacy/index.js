import React, { Component } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { 
    Wrapper,
    Heading, 
    Info,
    FieldWrapper } from './Style'
import Images from '../../themes/images'

export default class Privacy extends Component {

    render() {
        return (
            <Wrapper>
                <Header />
                <Heading>GDPR</Heading>                
                <Info>
                    <h1>What is GDPR?</h1>
                    <p>
                        The General Data Protection Regulation (GDPR) (Regulation (EU) 2016/679) is a regulation by which
                        the European Parliament, the Council of the European Union and the European Commission intend to 
                        strengthen and unify data protection for all individuals within the European Union (EU).<br/>
                        It also addresses the export of personal data outside the EU.<br/>
                        The GDPR aims primarily to give control back to citizens and residents over their personal data and to simplify
                        the regulatory environment for international business by unifying the regulation within the EU.<br/>
                        It becomes enforceable from 25 May 2018 after a two-year transition period and, since GDPR is a Regulation, not a Directive, it does not 
                        require national governments to pass any enabling legislation, and is thus directly binding and applicable.
                    </p>                    
                </Info>
                <Info>
                    <h1>Is my company affected by GDPR?</h1>
                    <p>
                        If your company is based in the EU, or if you ever receive applications, review 
                        candidates or even contact candidates within the EU, then yes - your company is affected by GDPR.
                    </p>
                </Info> 
                <Info>
                    <h1>What happens if my company does not comply with GDPR?</h1>
                    <p>
                        Data security has always been important.<br/>
                        But despite the severe repercussions of compromised data security, until recently, the fines 
                        for breach of data protection regulations were limited and enforcement actions infrequent.<br/>
                        However, the introduction of a potentially revolutionary European General Data Protection Regulation (GDPR) is likely to transform the way 
                        data-driven companies handle customer data by exposing them to the risk of hefty fines and severe penalties in the event of incompliance and data breach.
                    </p>
                </Info>        
                <FieldWrapper>
                    <img src={Images.aboutUs} alt="about" />                
                    <p>Failure to comply with the new regulations will lead to significant fines of up to 20 million EUR or 4 percent of the company’s global turnover, whichever is higher.</p>                     
                </FieldWrapper>
                <Info>
                    <p>
                        The GDPR subjects data controllers and processors that fail to comply with its requirements to severe consequences.<br/>
                        These consequences, contrary to what most people believe, are not just limited to monetary penalties.<br/>
                        Instead, they can potentially damage a business’s reputation and bottom-line.<br/>
                        There are three factors that together make the GDPR the most stringent regulation in the European data protection regime.
                    </p>
                    <ul>
                        <li>
                            Reputational Risk — The reputational risks of any data breach is always severe.<br/> 
                            However, implementation of the GDPR with obligation to notify authorities in case of data breaches is likely to result in increased enforcement activity.
                            This will consequently bring data protection breaches to light, compromising a company’s market position and reputation.
                        </li>
                        <li>
                            Geographic Risk — All organisations offering goods or services to EU markets or monitoring the behaviour of EU citizens are subject to the GDPR.
                            This includes all data analytics companies as well.
                        </li>
                        <li>Huge Fines — Failure to comply with the new regulations will lead to significant <b>fines of up to 20 million EUR or 4 percent of the company’s global turnover</b>, whichever is higher.</li>
                    </ul>
                    <p>
                        To avoid the huge fines and severe penalties, businesses need to have complete and mature data governance in place. 
                        From revising the existing contracts in place to getting a buy in from the key people in organisations, businesses 
                        will be required to review their entire data process management approach in order to become compliant and mitigate reputational and financial risks.
                    </p>
                </Info> 
                <Info>
                    <h1>What can I do to comply with GDPR?</h1>
                    <p>
                        In the past candidate data has been stored, shared and made available on multiple platforms and media, 
                        often without any supervision and control. This would be considered a direct violation of GDPR from may 2018.
                    </p>
                    <p>
                        Amongst other areas your organisation must adopt a <b>Protection by Design Approach</b> — There are certain ‘protection by design’ 
                        techniques that businesses can use to protect the personal data of their customers. These include:
                    </p>
                    <ul>
                        <li>
                            Pseudonymisation — Pseudonymisation (such as encryption, tokenisation, hashing) is a technique that involves categorisation of the 
                            personal data of customers into two types in such a manner that one type can no longer be attributed to an individual unless 
                            accompanied by the second type of information which is kept separately and is subject to various data protection measures.
                        </li>
                        <li>
                            Data Minimisation — As the name implies, data minimisation is about ensuring that only the data 
                            that’s necessary for a specific purpose is processed, used, or stored.
                        </li>
                    </ul>
                    <p>
                        To comply with GDPR we suggest that you store and encrypt all data centrally, and process candidates through a feasible structure. 
                        GDPR regulations include the right to be erased / forgotten, the right to acquire a complete copy of candidate data on file for 
                        each individual and which roles in the organisation has the right to view candidate data.
                    </p>
                    <p>
                        We suggest you use a GDPR compliant ATS (Applicant Tracking System) to process, store and encrypt candidate data.
                    </p>
                    <p>
                        Agentify is fully GDPR compliant, and all data is encrypted. We have a 3rd party data processing agreement in place with AWS, where our data is hosted.
                    </p>
                </Info>
                <Info>
                    <h1>Can I migrate my data to Agentify in order to become GDPR compliant?</h1>
                    <p>
                        Yes you can. We help you map your existing processes and data structure, migrate your data and make sure that your company is GDPR compliant.<br/><br/>
                        This Privacy Policy governs the manner in which Agentify ApS collects, uses, maintains and discloses information collected from users (each, a "User") of the http://www.agentify.me website ("Site"). 
                        This privacy policy applies to the Site and all products and services offered by Agentify ApS.
                    </p>                    
                </Info>
                <Info>
                    <h1>Personal identification information</h1>
                    <p>
                    We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, fill out a form, respond to 
                    a survey, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, phone number. Users may, however, 
                    visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification 
                    information, except that it may prevent them from engaging in certain Site related activities.
                    </p>                    
                </Info>
                <Info>
                    <h1>Non-personal identification information</h1>
                    <p>
                    We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical 
                    information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.
                    </p>                    
                </Info>
                <Info>
                    <h1>Web browser cookies</h1>
                    <p>
                    Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their 
                    web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.
                    </p>                    
                </Info>
                <Info>
                    <h1>How we use collected information</h1>
                    <p>
                    Agentify ApS may collect and use Users personal information for the following purposes:
                    </p>
                    <ul>
                        <li>
                        <i>To run and operate our Site</i>
                        </li>
                        <li>
                        We may need your information display content on the Site correctly.
                        </li>
                        <li>To improve customer service</li>
                        <li>Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
                        <li><i>To personalize user experience</i></li>
                        <li>We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
                        <li><i>To improve our Site</i></li>
                        <li>We may use feedback you provide to improve our products and services.</li>
                        <li><i>To process payments</i></li>
                        <li>We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.</li>
                        <li><i>To run a promotion, contest, survey or other Site feature</i></li>
                        <li>To send Users information they agreed to receive about topics we think will be of interest to them.</li>
                        <li><i>To manage product reviews and ratings</i></li>
                        <li>We may use third party service providers to help us manage product reviews and ratings left by Users.</li>
                        <li><i>To send periodic emails</i></li>
                        <li>We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests.</li>
                    </ul>                    
                </Info>
                <Info>
                    <h1>How we protect your information</h1>
                    <p>
                    We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal 
                    information, username, password, transaction information and data stored on our Site.
                    </p>                    
                </Info>
                <Info>
                    <h1>Sharing your personal information</h1>
                    <p>
                    We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors 
                    and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. We may use third party service providers to help us operate our business and the Site or administer activities 
                    on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.
                    </p>                    
                </Info>
                <Info>
                    <h1>Electronic newsletters</h1>
                    <p>
                    If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. We may use third party service providers to help us operate 
                    our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.
                    </p>                    
                </Info>
                <Info>
                    <h1>Changes to this privacy policy</h1>
                    <p>
                    Agentify ApS has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our Site. We encourage Users to frequently check this page for any changes to stay 
                    informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
                    </p>                    
                </Info>
                <Info>
                    <h1>Your acceptance of these terms</h1>
                    <p>
                    By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this 
                    policy will be deemed your acceptance of those changes.
                    </p>                    
                </Info>            
                <Info>
                    <h1>Contacting us</h1>
                    <p>
                    If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.<br/><br/>
                    This document was last updated on November 06, 2017                    
                    </p>                    
                </Info>
                <Footer />
            </Wrapper>
        )
    }
}
