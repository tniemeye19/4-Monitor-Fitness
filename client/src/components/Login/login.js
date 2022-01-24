import React, { useState } from 'react';
import './login-style.scss';
import './login-theme.scss';

import { 
    Button,
    FormControl,
    FormErrorMessage,
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

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        event.preventDefault();

        console.log(formState);

        try {
            const {data} = await login({
                variables: {...formState}
            });
            console.log('Inside client auth data: ', data)
            Auth.login(data.login.token, data.login.user.username);
        } catch (err) {
            console.log(err);
        }
    };

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
                    {/* {error && (
                        <FormErrorMessage>
                            Email is required to login
                        </FormErrorMessage>
                    )} */}
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
                    {/* {error && (
                        <FormErrorMessage>
                            Password is required to login
                        </FormErrorMessage>
                    )} */}
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