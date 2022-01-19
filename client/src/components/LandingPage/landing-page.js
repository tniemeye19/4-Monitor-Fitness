import React from 'react';
import './landing-page-style.scss';
import './landing-page-theme.scss';

import Login from '../Login/login';
import Signup from '../Signup/signup';

const LandingPage = () => {


    return (
        <div>
            In the landing page!
            <Login>
                In Login!
            </Login>
            <Signup>
                In Signup!
            </Signup>
        </div>
    )
}

export default LandingPage;