import React from 'react';
import './welcome-style.scss';

import UserAuth from '../UserAuth/user-auth';
import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import { BsDisplay } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

const Welcome = () => {
    const { onClose } = useDisclosure()
    const navigate = useNavigate();

    const onWorkoutsBtnClick = () => {
        navigate('/userworkouts')
        onClose();
      }
    
      const onAnalyticsBtnClick = () => {
        navigate('/analytics')
        onClose();
      }
    
      const onUserAnalyticsBtnClick = () => {
        navigate('/analytics/user')
        onClose();
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
                    <div className="auth-welcome-content">
                        <Heading size='xl'>Welcome back!</Heading>
                        <Heading size='xl'>Where to now?</Heading>
                        <div className='welcome-route-btns'>
                            <Button colorScheme='teal' onClick={onWorkoutsBtnClick} size="lg">My Workouts</Button>
                            <Button colorScheme='green' onClick={onAnalyticsBtnClick} size="lg">Analytics</Button>
                            <Button colorScheme='yellow' onClick={onUserAnalyticsBtnClick} size="lg">My Analytics</Button>
                        </div>
                    </div>
                    </>
                )}

                </div>
            </section>
        </div>
    )
}
                
export default Welcome;