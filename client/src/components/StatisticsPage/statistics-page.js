import React, {useState, useEffect} from 'react';
import './statistics-page-style.scss';
import './statistics-page-theme.scss';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { getUser } from '../../utils/API';
import Auth from '../../utils/auth';

const StatisticsPage = () => {

    const { params } = useParams();
    console.log('PARAMS: ', params);

    const authGetProfile = Auth.getProfile();
    console.log('Auth Get Profile: ', authGetProfile);
    console.log(authGetProfile.data.username);

    const { loading, data } = useQuery(QUERY_USER, {
        variables: {
            "username": `${authGetProfile.data.username}`
        }
    });

    const [userData, setUserData] = useState(loading ? null : data?.user);

    console.log('USER DATA: ', userData);

    const handleRender = async () => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response =  getUser(token);

            const userDetail = await response.json();

            console.log(userDetail);
            // setUserData(userData);
        } catch (err) {
            console.error(err);
        }

        // try {

        //     const response = await getUser(token);

        //     if (!response.ok) {
        //         throw new Error('Something went wrong in stats page');
        //     }

        //     const user = await response.json();

        //     setUserData(user)

        // } catch (e) {
        //     console.log('Error in Stats catch: ', e);
        // }
    }

    handleRender();
        


    return (
        <div>
            <h2>
            {/* {!loading && userData
                ? `${userData}` 
                : 'No user data to show...'} */}

            </h2>
        </div>
    )
}

export default StatisticsPage;