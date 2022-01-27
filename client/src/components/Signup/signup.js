import React, { useState } from 'react';
import './signup-style.scss';

import { 
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input 
} from '@chakra-ui/react';

import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';
import { signup } from '../../utils/Reducers/notify-signup';

const Signup = () => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    const [addUser, {error}] = useMutation(ADD_USER);

    const dispatch = useDispatch();

    const accountForChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            const value = true;
            
            Auth.login(data.addUser.token, value);
            dispatch(signup());
        } catch (err) {
            console.log(err);
        }
    }

    const tryAgainSubmit = (event) => {
        event.preventDefault();
        window.location.reload(false);
    }

    if (error) {
        return (
            <>
            <div className="error">
                <p>You did not fill out the form correctly</p>
                <Button 
                    className='signupBtn'
                    colorScheme='red' 
                    size='md' 
                    type='submit'
                    onClick={tryAgainSubmit}>Try Again
                </Button>
            </div>
            </>
        )
    }

    return (
        <div className='signup'>
        {Auth.loggedIn() ? null : (
            <>
            <Heading size='md'>SIGNUP</Heading>
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
                </div>
                <div>
                    <FormLabel htmlFor='signuppwd'>Password:</FormLabel>
                    <Input
                        placeholder='********'
                        name='password'
                        type='password'
                        id='signuppwd'
                        value={formState.password}
                        onChange={accountForChange}
                    />
                </div>
                <Button 
                    className='signupBtn'
                    colorScheme='yellow' 
                    size='md' 
                    type='submit'
                    onClick={handleSignupSubmit}>Submit
                </Button>
            </FormControl>
            </>
        )}
        </div>
    );
};

export default Signup;