import React, { useState } from 'react';
import './login-style.scss';

import { 
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input 
} from '@chakra-ui/react';

import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    
    const [login, { error }] = useMutation(LOGIN_USER);

    const accountForChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            const value = false;

            Auth.login(data.login.token, value);
        } catch (err) {
            console.log(err);
        }
    };

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
        <div className='login'>
        {Auth.loggedIn() ? null : (
            <>
            <Heading size='md'>LOGIN</Heading>
            <FormControl onSubmit={handleLoginSubmit}>
                <div>
                    <FormLabel htmlFor='email'>Email Address:</FormLabel>
                    <Input
                        placeholder='example@email.com'
                        name='email'
                        type='email'
                        id='email'
                        onChange={accountForChange}
                    />
                </div>
                <div>
                    <FormLabel htmlFor='loginpwd'>Password:</FormLabel>
                    <Input
                        placeholder='********'
                        name='password'
                        type='password'
                        id='loginpwd'
                        onChange={accountForChange}
                    />
                </div>
                <Button 
                    className='loginBtn'
                    colorScheme='green' 
                    size='md' 
                    type='submit'
                    onClick={handleLoginSubmit}>Submit
                </Button>
            </FormControl>
            </>
        )}
        </div>
    )
}

export default Login;