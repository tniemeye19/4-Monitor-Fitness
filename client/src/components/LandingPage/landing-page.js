import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../utils/Reducers/notify-signup';

import './landing-page-style.scss';
import './landing-page-theme.scss';
import { Button, Heading } from '@chakra-ui/react';
import { BsDisplay } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';

const LandingPage = () => {

    const navigate = useNavigate();
    const setSignedUp = useSelector((state) => state.signup_notification.value);
    const dispatch = useDispatch();

    const onGetStartedClick = (e) => {
        e.preventDefault();
        navigate('/welcome');
    }

    const showSignupNotification = (e) => {
        e.preventDefault();
        let value = dispatch(signup());
        console.log(value);

    }

    return (

        <div className='landing-page'>
            <section className='landing'>
                <div className='landing-content'>
                    <Heading className='landing-header' size='3xl'>4 Monitor Fitness</Heading>
                    <div className='landing-monitors'>
                        <BsDisplay className='landing-displayIcon' />
                        <BsDisplay className='landing-displayIcon' />
                        <BsDisplay className='landing-displayIcon' />
                        <BsDisplay className='landing-displayIcon' />
                    </div>
                    <Button 
                        className='landing-btn' 
                        colorScheme='green'
                        onClick={onGetStartedClick} 
                        size='lg'>
                            <AiOutlineCode size={32} />
                    </Button>
                </div>
            </section>
        </div>
    )
};

export default LandingPage;