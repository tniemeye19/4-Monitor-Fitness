import { createSlice } from '@reduxjs/toolkit';

export const notifySignup = createSlice({
    name: 'signup_notification',
    initialState: {
        value: false,
    },
    reducers: {
        signup: (state) => {
            state.value = true;
        },
        didSignup: (state, action) => {
            state.value += action.payload
        },
    },
});

export const { signup, didSignup } = notifySignup.actions;

export default notifySignup.reducer;