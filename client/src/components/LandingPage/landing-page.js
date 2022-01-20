import React from 'react';
import './landing-page-style.scss';
import './landing-page-theme.scss';

import Settings from '../SettingsPage/settings-page';

const LandingPage = () => {


    return (
        <>
            <div>
                <Settings />
            </div>
            <div>
                <h2>WELCOME TO 4 MONITOR FITNESS</h2>
                <p>This is where your fitness journey begins</p>
            </div>
        </>
    )
}

export default LandingPage;