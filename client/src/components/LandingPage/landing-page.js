import React, { useState } from 'react';

import './landing-page-style.scss';
import './landing-page-theme.scss';
import { Button, Heading } from '@chakra-ui/react';
import { BsDisplay } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
import { GiArchiveRegister } from 'react-icons/gi';
import { AiOutlineCode } from 'react-icons/ai';

import SettingsPage from '../SettingsPage/settings-page';

import Login from '../Login/login';
import Signup from '../Signup/signup';

import Auth from '../../utils/auth';

const LandingPage = () => {

    let title = '< Welcome to 4 Monitor Fitness />'

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

                <section className='welcome'>
                    <Heading>{title}</Heading>
                    <div className='monitors'>
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                    </div>
                    <p>...login or signup below...</p>
                </section>
                <div>
                {Auth.loggedIn() ? (
                    <section>
                        <h2>You are logged in!</h2>
                    </section>
                ) : (
                    <section className='form-section'>
                        <div className='form-init-btns'>
                            <Button className='selectLoginBtn' colorScheme='green' disabled={disableLoginBtn} leftIcon={<BiLogInCircle />} onClick={onLoginClick} size='lg'>Login</Button>
                            <Button className='selectSignupBtn' colorScheme='yellow' disabled={disableSignupBtn} leftIcon={<GiArchiveRegister />} onClick={onSignupClick} size='lg'>Signup</Button>
                        </div>
                        { showLoginForm ? (
                            <div className='form-init'>
                                <Login />
                            </div>) : null }
                        { showSignupForm ? (
                            <div className='form-init'>
                                <Signup />
                            </div>) : null }

                    </section>
                )}
                </div>
            </>
            ) : (
            <>
                <section 
                    className='get-started'>
                    <Heading as='h1' size='4xl'>4 Monitor Fitness</Heading>
                    <div className='monitors'>
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                    </div>
                    <Button className='getStartedBtn' onClick={onGetStartedClick} size='lg'><AiOutlineCode size={32} /></Button>
                </section>
            </>
            )}
        </div>
    )
}

export default LandingPage;