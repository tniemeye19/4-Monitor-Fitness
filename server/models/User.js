const {model, Schema} = require("mongoose");
const bcrypt = require("bcrypt");
const workoutSchema = require("./Workout");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        workouts: [workoutSchema]
    }
);

//pre-save middleware for password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

//compare the incoming password with hashed password
userSchema.methods.isCorrectPassword = async function(password){
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;