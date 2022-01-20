const {User, Workout} = require("../models");
// const {AuthenticationError} = require("apollo-server-express");
// const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select("-__v -password")
                .populate("workouts");
        },
        user: async (parent, {username}) => {
            return User.findOne({username})
                .select("-__v -password")
                .populate("workouts");
        },
        workouts: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Workout.find(params).sort({createdAt: -1});
        },
        workout: async (parent, {_id}) => {
            return Workout.findOne({_id});
        }
    },
    Mutation: {
        addWorkout: async (parent, args, context) => {
            if(context.user){
                const workout = await Workout.create({...args, username: context.user.username});

                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {workouts: workout._id}},
                    {new: true}
                );

                return workout;
            }

            // throw new AuthenticationError("You need to be logged in.")
        },
        addExercise: async (parent, {workoutId, exerciseTitle}, context) => {
            if(context.user){
                const updatedWorkout = await Workout.findOneAndUpdate(
                    {_id: workoutId},
                    {$push: {exercises: {exerciseTitle, username: context.user.username}}},
                    {new: true, runValidators: true}
                );

                return updatedWorkout;
            }

            // throw new AuthenticationError("You need to be logged in.")
        }
    }
}

module.exports = resolvers;