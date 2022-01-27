import React from 'react';
import './landing-page-style.scss';

import { Button, Heading } from '@chakra-ui/react';
import { BsDisplay } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const navigate = useNavigate();

    const onGetStartedClick = (e) => {
        e.preventDefault();
        navigate('/welcome');
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