const {gql} = require("apollo-server-express");

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
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        me: User
        users: [User]
        user(username: String!): User
        workouts(username: String): [Workout]
        workout(_id: ID!): Workout
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addWorkout(workoutTitle: String!): User
        addExercise(workoutId: ID!, exerciseTitle: String!, exerciseDescription: String!): User
    }
`;

module.exports = typeDefs;