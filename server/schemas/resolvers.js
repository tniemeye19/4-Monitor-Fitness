const {User, Workout} = require("../models");
const {AuthenticationError} = require("apollo-server-express");
const {signToken} = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                    .select("-__v -password")
                    .populate("workouts");
                return userData;
            }

            throw new AuthenticationError("Not logged in");
        },
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
            return User.find(params)
                .populate("workouts")
                .sort({createdAt: -1});
        },
        workout: async (parent, {_id}) => {
            return User.findOne({_id});
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return {token, user};
        },
        addWorkout: async (parent, args, context) => {
            if(context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {workouts: args}},
                    {new: true}
                );

                return updatedUser;
            }

            // console.log(parent);
            // console.log(args);
            console.log(context.user);

            throw new AuthenticationError("You need to be logged in.")
        },
        addExercise: async (parent, args, context) => {
            if(context.user){
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {workouts: {$push: {exercises: {...args}}}}},
                    {new: true}
                )

                return updatedUser;
            }

            throw new AuthenticationError("You need to be logged in.")
        }
    }
}

module.exports = resolvers;