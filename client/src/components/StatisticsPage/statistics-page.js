import React, {useState} from 'react';
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

    const { loading, data } = useQuery(QUERY_USER);
    const [userData, setUserData] = useState(loading ? null : data?.me);

    console.log('DATA: ', data);

    const handleRender = async () => {

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const thisUserData = data;
            console.log(thisUserData);

            setUserData(() => {
                return {
                    ...userData
                }
            })
            // if (!response.ok) {
            //     throw new Error('something went wrong in stats page');
            //     console.log(response);
            // }

            // const { thisUsersData } = await response.json();
            console.log('STATS USER DATA: ', userData);

            // setUserData(thisUsersData);
        } catch (e) {
            console.log(e);
        }
    }

    

    if (!userData) {
        return <h2>LOADING...</h2>
    } else {
        handleRender();
    }

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