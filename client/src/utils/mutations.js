import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_WORKOUT = gql`
    mutation addWorkout($workoutTitle: String!, $username: String!){
        addWorkout(workoutTitle: $workoutTitle, username: $username){
            _id
            workoutTitle
            username
            createdAt
            exercises{
                _id
                exerciseTitle
                exerciseDescription
                createdAt
            }
        }
    }
`;

export const DELETE_WORKOUT = gql`
    mutation deleteWorkout($workoutId: ID!){
        deleteWorkout(workoutId: $workoutId){
            _id
            workoutTitle
            username
            createdAt
            exercises{
                _id
                exerciseTitle
                exerciseDescription
                createdAt
            }
        }
    }
`;

export const ADD_EXERCISE = gql`
    mutation AddExercise($workoutId: ID!, $exerciseTitle: String!, $exerciseDescription: String!){
        addExercise(workoutId: $workoutId, exerciseTitle: $exerciseTitle, exerciseDescription: $exerciseDescription){
            _id
            workoutTitle
            username
            createdAt
            exercises{
                _id
                exerciseTitle
                exerciseDescription
                createdAt
            }
        }
    }
`;

export const REMOVE_EXERCISE = gql`
    mutation removeExercise($workoutId: ID!, $exerciseId: ID!){
        removeExercise(workoutId: $workoutId, exerciseId: $exerciseId){
            _id
            createdAt
        }
    }
`;