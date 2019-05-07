import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Home from './pages/LandingPage'
import TalentSignIn from './pages/SignIn/Talent'
import TalentSignUp from './pages/SignUp/Talent'
import TalentForgotPassword from './pages/ForgotPassword/Talent'
import TalentChangePassword from './pages/ChangePassword/Talent'
import EmployerSignUp from './pages/SignUp/Employer'
import TalentPage from './pages/Profile/Talent'
import EmployerPage from './pages/Profile/Employer'
import Person from './pages/Profile/Talent/Person'
import Category from './pages/Profile/Talent/Category'
import Submition from './pages/Profile/Talent/Submition'
import Candidate from './pages/Profile/Talent/Candidate'
import Standard from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import FAQ from './pages/FAQ'
import TCA from './pages/TCA'
import LinkedInPopUp from '../node_modules/react-linkedin-login-oauth2/lib/LinkedInPopUp';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="/home" component={ Home } />
        <Route path="/signin/talent" component={ TalentSignIn } />
        <Route path="/linkedin" component={ LinkedInPopUp } />
        <Route path="/signup/talent" component={ TalentSignUp } />
        <Route path="/get-password/talent" component={ TalentForgotPassword } />
        <Route path="/talent-change-password" component={ TalentChangePassword } />
        <Route path="/signup/employer" component={ EmployerSignUp } />
        <Route path="/profile/talent" component={ TalentPage }>
            <IndexRoute component={ Person } />
            <Route path="/profile/talent/person" component={ Person } />
            <Route path="/profile/talent/category" component={ Category } />
            <Route path="/profile/talent/submition" component={ Submition } />
            <Route path="/profile/talent/candidate" component={ Candidate } />
        </Route>        
        <Route path="/profile/employer" component={ EmployerPage } />
        <Route path="/about" component={ Standard } />
        <Route path="/contact" component={ Contact } />
        <Route path="/faq" component={ FAQ } />
        <Route path="/privacy" component={ Privacy } />
        <Route path="/tca" component={ TCA } />
    </Route>
)