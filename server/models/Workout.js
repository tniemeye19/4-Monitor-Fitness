const {Schema, model} = require("mongoose");
const exerciseSchema = require("./Exercise");
const dateFormat = require("../utils/dateFormat");

const workoutSchema = new Schema(
    {
        workoutTitle: {
            type: String,
            required: "You need to title your workout.",
            minlength: 1,
            maxlength: 50
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        exercises: [exerciseSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;