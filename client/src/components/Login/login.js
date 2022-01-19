import React, { useState } from 'react';
import './login-style.scss';
import './login-theme.scss';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const editedInput = await login({
                variables: { email: formState.email, password: formState.password }
            });
            const token = editedResponse.data.login.token;
        } catch (err) {
            console.log(err);
        }
    };

    const accountForChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        placeholder='example@email.com'
                        name='email'
                        type='email'
                        id='email'
                        onChange={accountForChange}
                    />
                </div>
                <div>
                    <label htmlFor='loginpwd'>Password</label>
                    <input
                        placeholder='********'
                        name='passowrd'
                        type='password'
                        id='loginpwd'
                        onChange={accountForChange}
                    />
                </div>
            </form>
            {error && <div>Login Failed!</div>}
        </div>
    )
}

export default Login;