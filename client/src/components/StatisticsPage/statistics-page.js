import React from 'react';
import './statistics-page-style.scss';
import './statistics-page-theme.scss';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';

const StatisticsPage = () => {



    const authGetProfile = Auth.getProfile();
    const username = authGetProfile.data.username;

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: {username}
    })

    const userData = { data }
    console.log(userData);

    return (
        <div>
            <h2>
            {!loading && userData
                ? `${userData}` 
                : 'No user data to show...'}

            </h2>
        </div>
    )
}

export default StatisticsPage;