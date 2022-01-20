import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import './signup-style.scss';
import './signup-theme.scss';

import { 
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input 
} from '@chakra-ui/react';

import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

const Signup = () => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    // const [createUser, { error, data }] = useMutation(CREATE_USER);

    const accountForChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSignupSubmit = async (event) => {
        // event.preventDefault();

        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        // try {
        //     const { data } = await createUser({
        //         variables: { ...formState },
        //     });

        //     Auth.login(data.createUser.token);
        // } catch (err) {
        //     console.log(err);
        // }
    }

    return (
        <div>
        {Auth.loggedIn() ? null : (
            <>
            <FormControl onSubmit={handleSignupSubmit}>
                <div>
                    <FormLabel htmlFor='username'>Username:</FormLabel>
                    <Input
                        placeholder='Username'
                        name='username'
                        type='username'
                        id='username'
                        value={formState.username}
                        onChange={accountForChange}
                    />
                    {/* {error && (
                        <FormErrorMessage>
                            Username is required to signup
                        </FormErrorMessage>
                    )} */}
                </div>
                <div>
                    <FormLabel htmlFor='email'>Email Address:</FormLabel>
                    <Input
                        placeholder='example@email.com'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={accountForChange}
                    />
                    {/* {error && (
                        <FormErrorMessage>
                            Email is required to signup
                        </FormErrorMessage>
                    )} */}
                </div>
                <div>
<<<<<<< HEAD
                    <FormLabel htmlFor='signuppwd'>Username:</FormLabel>
                    <Input
=======
                    <label htmlFor='signuppwd'>Password:</label>
                    <input
>>>>>>> 827613e866c5dd9947ee45d4b77690a00b2124c6
                        placeholder='********'
                        name='password'
                        type='password'
                        id='signuppwd'
                        value={formState.password}
                        onChange={accountForChange}
                    />
                    {/* {error && (
                        <FormErrorMessage>
                            Password is required to signup
                        </FormErrorMessage>
                    )} */}
                </div>
                <Button 
                    colorScheme='teal' 
                    size='xs' 
                    type='submit'>Submit
                </Button>
            </FormControl>
            </>
        )}
        </div>
    );
};

export default Signup;