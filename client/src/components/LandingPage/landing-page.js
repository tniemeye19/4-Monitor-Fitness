import React from 'react';
import { useNavigate } from 'react-router-dom';

import './landing-page-style.scss';
import './landing-page-theme.scss';
import { Button, Heading } from '@chakra-ui/react';
import { BsDisplay } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';

const LandingPage = () => {

    const navigate = useNavigate();

    const onGetStartedClick = (e) => {
        e.preventDefault();
        navigate('/welcome');
    }

    return (

        <div className='landing-page'>
            <section 
                className='get-started'>
                <Heading as='h1' size='4xl'>4 Monitor Fitness</Heading>
                <div className='monitors'>
                    <BsDisplay className='displayIcon' />
                    <BsDisplay className='displayIcon' />
                    <BsDisplay className='displayIcon' />
                    <BsDisplay className='displayIcon' />
                </div>
                <Button 
                    className='getStartedBtn' 
                    onClick={onGetStartedClick} 
                    size='lg'>
                        <AiOutlineCode size={32} />
                </Button>
            </section>
        </div>
    )
};

export default LandingPage;