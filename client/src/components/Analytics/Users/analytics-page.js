import React from 'react';
import './analytics-page.scss';
import { Heading } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

import Auth from '../../../utils/auth';
import { QUERY_USERS } from '../../../utils/queries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UsersAnalyticsPage = () => {

    let labels = [];
    let userWorkouts = [];
    let userExercises = [];

    const { loading, error, data } = useQuery(QUERY_USERS);

    if (loading) {
        return <h2>Loading...</h2>
    }

    try {
        
        let allUsersData = { data }
        console.log('Users Data: ', allUsersData)
        let totalUsers = allUsersData.data.users.length;
        console.log('Length: ', totalUsers);

        for (let i = 0; i < totalUsers; i++) {
            let username = allUsersData.data.users[i].username;
            let userWorkoutsLength = allUsersData.data.users[i].workouts.length;
            
            labels.push(username);
            userWorkouts.push(userWorkoutsLength);

            if (userWorkoutsLength === 0) {
                let value = 0;
                userExercises.push(value);
            } else {
                for (let j = 0; j < userWorkoutsLength; j++) {
                    let userExercisesLength = allUsersData.data.users[i].workouts[j].exercises.length;
                    userExercises.push(userExercisesLength);
                }
            }

            
        }

    }   catch (err) {
        console.log(err);
    }
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 18
                    }
                }
            },
            title: {
                display: false,
                text: '4 Monitor Fitness Workout Data'
            },
        },
        scales: {
            x: {
                stacked: true,
            }
        }
    };

    const graphData = {
        labels,
        datasets: [
            {
                label: 'Exercises',
                data: userExercises,
                backgroundColor: 'rgba(1, 20, 50, 0.9)',
                hoverOffset: 4
            },
            {
                label: 'Workouts',
                data: userWorkouts,
                backgroundColor: 'rgba(41, 133, 90, 0.9)',
                hoverOffset: 4
            },
        ]
    }

    return (
        <div className='landing-page'>
            <div className="graph-page">
                <div className="graph-container">
                    <div className="graph-actual">
                        <Heading size="2xl">All User Analytics</Heading>
                        <Bar className="graph-actual" options={options} data={graphData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersAnalyticsPage;