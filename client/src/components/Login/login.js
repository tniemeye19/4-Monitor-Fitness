import React, { useState } from 'react';
import './login-style.scss';
import './login-theme.scss';

import { 
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input 
} from '@chakra-ui/react';

import Auth from '../../utils/auth';
// import { LOGIN } from '../../utils/mutations';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    
    // const [login, { error }] = useMutation(LOGIN);

    const accountForChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleLoginSubmit = async (event) => {

        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }

        // event.preventDefault();
        // try {
        //     const editedInputResponse = await login({
        //         variables: { email: formState.email, password: formState.password }
        //     });
        //     const token = editedInputResponse.data.login.token;
        //     Auth.login(token);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    return (
        <div>
        {Auth.loggedIn() ? null : (
            <>
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
                        name='passowrd'
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
            </FormControl>
            <Button 
                colorScheme='teal' 
                size='xs' 
                type='submit'>Submit
            </Button>
            </>
        )}


        </div>
    )
}

export default Login;