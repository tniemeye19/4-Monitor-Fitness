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
            let userSingleWorkout = allUsersData.data.users[i].workouts;
            console.log(userWorkoutsLength)
            labels.push(username);
            userWorkouts.push(userWorkoutsLength);
            for (let j = 0; j < userWorkoutsLength; j++) {
                let userExercisesLength = userSingleWorkout[j].exercises.length;
                console.log(userExercisesLength)
                if (userExercisesLength === 0) {
                    let zero = "zerp";
                    userExercises.push(zero);
                    console.log(userExercises);
                } else {
                    console.log(userExercisesLength);
                    console.log(j);
                    userExercises.push(userExercisesLength);
                    console.log(userExercises);
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
                data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
                backgroundColor: 'rgba(1, 20, 50, 0.9)',
                hoverOffset: 4
            },
            {
                label: 'Workouts',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
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