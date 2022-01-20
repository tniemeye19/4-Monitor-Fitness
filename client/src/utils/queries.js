import {gql} from "@apollo/client";


//Could add friends to this if we get here
export const QUERY_USER = gql`
    query user($username: String!){
        user(username: $username){
            _id
            username
            email
            workouts{
                workoutTitle
                createdAt
            }
        }
    }
`;

export const QUERY_WORKOUTS = gql`
    query workouts($username: String!){
        workouts(username: $username){
            _id
            workoutTitle
            createdAt
            username
            exercises{
                exerciseTitle
                exerciseDescription
                createdAt
            }
        }
    }
`;

export const QUERY_WORKOUT = gql`
    query workout($id: ID!){
        workout(_id: $id){
            _id
            workoutTitle
            createdAt
            username
            exercises{
                exerciseTitle
                exerciseDescription
                createdAt
            }
        }
    }
`;