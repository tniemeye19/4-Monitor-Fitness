const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    login
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of a user
router.route('/welcome').post(createUser).put(authMiddleware);

module.exports = router;