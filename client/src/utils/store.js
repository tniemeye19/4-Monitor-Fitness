import { configureStore } from '@reduxjs/toolkit';
import notifySignup from './Reducers/notify-signup';

export default configureStore({
    reducer: {
        signup_notification: notifySignup
    },
})