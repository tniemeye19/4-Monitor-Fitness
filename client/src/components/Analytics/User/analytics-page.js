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

import Auth from '../../../utils/auth';
import { QUERY_USER } from '../../../utils/queries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SingleUserAnalyticsPage = () => {

    let loggedInUserData = Auth.getProfile();
    let username = loggedInUserData.data.username;

    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: {username}
    });

    let labels = [];
    let userExercises = [];

    if (loading) {
        return <h2>Loading...</h2>
    } else if (error) {
        console.log('Something went wrong in the user analytics page: ', error);
    }

    try {
        const singleUserData = { data }
        let totalWorkouts = singleUserData.data.user.workouts.length;
        for (let i = 0; i < totalWorkouts; i++) {
            let workoutTitle = singleUserData.data.user.workouts[i].workoutTitle;
            labels.push(workoutTitle);
            let exercisesLength = singleUserData.data.user.workouts[i].exercises.length;
            userExercises.push(exercisesLength);
        }
    } catch (err) {
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
    };

    const graphData = {
        labels,
        datasets: [
            {
                label: 'Exercises',
                data: userExercises,
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
                        <Heading size="2xl">{username}'s Analytics</Heading>
                        <Bar className="graph-actual" options={options} data={graphData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleUserAnalyticsPage;