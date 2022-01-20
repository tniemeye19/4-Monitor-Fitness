const {gql} = require("apollo-server-express");

//WILL ADD ME QUERY AFTER AUTH IS SET UP
//WILL ADD LOGIN AND ADDUSER MUTATIONS AFTER AUTH IS SET UP 
//WILL ADD REMOVEWORKOUT AND REMOVEEXERCISE IN THE FUTURE

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        workouts: [Workout]
    }

    type Workout{
        _id: ID
        workoutTitle: String
        createdAt: String
        username: String
        exercises: [Exercise]
    }

    type Exercise{
        _id: ID
        exerciseTitle: String
        exerciseDescription: String
        createdAt
    }

    type Query{
        users: [User]
        user(username: String!): User
        workouts(username: String): [Workout]
        workout(_id: ID!): Workout
    }

    type Mutation{
        addWorkout(workoutTitle: String!): Workout
        addExercise(workoutId: ID!, exerciseTitle: String!): Workout
    }
`;

module.exports = typeDefs;