import React, { useState } from 'react';
import './signup-style.scss';
import './signup-theme.scss';

import Auth from '../../utils/auth';
// import { CREATE_USER } from '../../utils/mutations';

const Signup = () => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    // const [createUser, { error, data }] = useMutation(CREATE_USER);

    const handleSignupSubmit = async (event) => {
        // event.preventDefault();
        // const editedInputResponse = await createUser({
        //     variables: {
        //         username: formstate.username,
        //         email: formstate.email,
        //         password: formstate.password
        //     },
        // });
        // const token = editedInputResponse.data.createUser.token;
        // Auth.login(token)
    }

    const accountForChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
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
                    <label htmlFor='signuppwd'>Username:</label>
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