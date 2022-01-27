import React, { useState } from 'react';
import './user-auth-style.scss';

import { BiLogInCircle } from 'react-icons/bi';
import { GiArchiveRegister } from 'react-icons/gi';
import { Button } from '@chakra-ui/react';

import Login from '../Login/login';
import Signup from '../Signup/signup';

const UserAuth = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [disableLoginBtn, setDisableLoginBtn] = useState(false);
    const [disableSignupBtn, setDisableSignupBtn] = useState(false);

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
    )
}

export default UserAuth;