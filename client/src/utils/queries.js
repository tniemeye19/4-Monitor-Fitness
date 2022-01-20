import {gql} from "@apollo/client";


//Could add friends to this if we get here. Will add workouts{} to this 
//once database schema is in place
export const QUERY_USER = gql`
    query user($username: String!){
        user(username: $username){
            _id
            username
            email
        }
    }
`;

//will add more to this when workout schema is established
export const QUERY_WORKOUTS = gql`
    query workouts($username: String!){
        workouts(username: $username){
            _id

        }
    }
`;

//will add more to this when workout schema is established
export const QUERY_WORKOUT = gql`
    query workout($id: ID!){
        workout(_id: $id){
            _id
        }
    }
`;