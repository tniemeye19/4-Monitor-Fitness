const { User } = require('../models');

const { signToken } = require('../utils/auth');

module.exports = {
    // get a single user by either their id or their username
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: 'User with this id cannot be found!' });
        }

        res.json(foundUser);
    },
    // create a user, sign a token, and send it back (to client/src/components/Signup)
    async createUser({ body }, res) {
        const user = await User.create(body);

        if (!User) {
            return res.status(400).json({ message: 'Something went wrong...' })
        }
        const token = signUser(token);
        res.json({ token, user });
    },
    // Login a user, sign a token, and sent it back (to client/src/components/Login)
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (!user) {
            return res.status(400).json({ message: 'Sorry, we cant find this user!' });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }

        const token = signUser(user);
        res.json({ token, user });
    }
}