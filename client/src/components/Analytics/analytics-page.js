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

import Auth from '../../utils/auth';
import { QUERY_USERS } from '../../utils/queries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {

    const { loading, error, data } = useQuery(QUERY_USERS);
    const allUsersData = { data }
    console.log("All users data: ", allUsersData);

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

    const labels = ['Fun', 'Not Fun', 'Easy', 'Hard'] //map through each user to get all users and their labels in ['label', 'label'] format

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

export default AnalyticsPage;