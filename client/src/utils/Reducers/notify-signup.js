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
    },
});

export const { signup } = notifySignup.actions;

export default notifySignup.reducer;