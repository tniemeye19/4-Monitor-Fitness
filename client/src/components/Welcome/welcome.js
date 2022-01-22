import React from 'react';
import './welcome-style.scss';
import './welcome-theme.scss';
import UserAuth from '../UserAuth/user-auth';
import { Heading } from '@chakra-ui/react';
import { BsDisplay } from 'react-icons/bs';

import Auth from '../../utils/auth';

const Welcome = () => {

    // let title = '< Welcome to 4 Monitor Fitness />';

    return (
        <div className="landing-page">
            <section className='welcome'>
                <div className='welcome-content'>
                    {/* <Heading>{title}</Heading> */}
                    <div className='monitors'>
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                        <BsDisplay className='displayIcon' />
                    </div>
                    {/* <p>...login or signup below...</p> */}
                    <UserAuth />
                </div>
            </section>
        </div>
    )
}
                
export default Welcome;