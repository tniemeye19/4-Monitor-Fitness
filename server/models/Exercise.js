const {Schema} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const exerciseSchema = new Schema(
    {
        exerciseTitle: {
            type: String,
            required: true,
            maxlength: 100
        },
        exerciseDescription: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = exerciseSchema;