import React, { useState } from 'react';

import './landing-page-style.scss';
import './landing-page-theme.scss';
import { Button, Heading } from '@chakra-ui/react';

import SettingsPage from '../SettingsPage/settings-page';

import Login from '../Login/login';
import Signup from '../Signup/signup';

import Auth from '../../utils/auth';

const LandingPage = () => {

    const [showPageContent, setShowPageContent] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [disableLoginBtn, setDisableLoginBtn] = useState(false);
    const [disableSignupBtn, setDisableSignupBtn] = useState(false);

    const onGetStartedClick = () => {
        setShowPageContent(true);
    }

    const onLoginClick = () => {
        setShowSignupForm(false);
        setShowLoginForm(true);
        setDisableLoginBtn(true);
        setDisableSignupBtn(false);
    }

    const onSignupClick = () => {
        setShowLoginForm(false);
        setShowSignupForm(true);   
        setDisableSignupBtn(true); 
        setDisableLoginBtn(false);
    }

    return (

        <div class='landing-page'>
            {showPageContent ? (
            <>
                <div className='settings-drawer-wrapper'>
                     <SettingsPage />
                 </div>
                 <div>
                     <h2>WELCOME TO 4 MONITOR FITNESS</h2>
                     <p>This is where your fitness journey begins</p>
                 </div>
                 <div>
                 {Auth.loggedIn() ? (
                    <section>
                        <h2>You are logged in!</h2>
                    </section>
                ) : (
                    <section className='form-section'>
                        <div className='form-init-btns'>
                            <Button className='selectLoginBtn' colorScheme='green' disabled={disableLoginBtn} onClick={onLoginClick} size='lg'>Login</Button>
                            <Button className='selectSignupBtn' colorScheme='yellow' disabled={disableSignupBtn} onClick={onSignupClick} size='lg'>Signup</Button>
                        </div>
                        <div className='form-init'>
                            { showLoginForm ? <Login /> : null }
                            { showSignupForm ? <Signup /> : null }
                        </div>
                    </section>
                )}
                </div>
            </>
            ) : (
            <>
                <section 
                    animate={{}}
                    className='get-started'>
                    <Heading as='h1' size='4xl'>4 Monitor Fitness</Heading>
                    <br />
                    <Button className='getStartedBtn' colorScheme='orange' onClick={onGetStartedClick} size='lg'>Get Started</Button>
                </section>
            </>
            )}
        </div>
    )
}

export default LandingPage;