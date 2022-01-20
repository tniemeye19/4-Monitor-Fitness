import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import './signup-style.scss';
import './signup-theme.scss';

import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

const Signup = () => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    const [addUser, { error }] = useMutation(ADD_USER);

    //update state based on form input changes
    const accountForChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //submit form
    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        try{
            const {data} = await addUser({
                variables: {...formState}
            });
            console.log(data);
            Auth.login(data.addUser.token);
        }
        catch(e){
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignupSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        placeholder='Username'
                        name='username'
                        type='username'
                        id='username'
                        onChange={accountForChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email Address:</label>
                    <input
                        placeholder='example@email.com'
                        name='email'
                        type='email'
                        id='email'
                        onChange={accountForChange}
                    />
                </div>
                <div>
                    <label htmlFor='signuppwd'>Password:</label>
                    <input
                        placeholder='********'
                        name='password'
                        type='password'
                        id='signuppwd'
                        onChange={accountForChange}
                    />
                </div>
                <button type='submit'>Signup!</button>
            </form>
        </div>
    );
};

export default Signup;