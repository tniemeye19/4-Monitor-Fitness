import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome-style.scss';
import './welcome-theme.scss';
import UserAuth from '../UserAuth/user-auth';
import { Button, Heading } from '@chakra-ui/react';
import { BsDisplay } from 'react-icons/bs';
import { ImStatsBars } from 'react-icons/im';

import Auth from '../../utils/auth';

const Welcome = () => {

    const navigate = useNavigate();

    const onStatsBtnClick = (e) => {
        e.preventDefault();
        navigate('/statistics/:id');
    }

    return (
        <div className="landing-page">
            <section className='welcome'>
                <div className='welcome-content'>
                {!Auth.loggedIn() ? (
                    <>
                    <Heading className='welcome-header' size='3xl'>4 Monitor Fitness</Heading>
                    <div className='welcome-monitors'>
                        <BsDisplay className='welcome-displayIcon' />
                        <BsDisplay className='welcome-displayIcon' />
                        <BsDisplay className='welcome-displayIcon' />
                        <BsDisplay className='welcome-displayIcon' />
                    </div>
                    {/* <p>...login or signup below...</p> */}
                    <UserAuth />
                    </>
                ) : (
                    <>
                    <Heading size='xl'>Welcome back!</Heading>
                    <Heading size='xl'>Where do you want to go?</Heading>
                    <div className='welcome-route-btns'>
                        <Button onClick={onStatsBtnClick} size='lg'>
                            <ImStatsBars /> Statistics
                        </Button>
                    </div>
                    </>
                )}

                </div>
            </section>
        </div>
    )
}
                
export default Welcome;