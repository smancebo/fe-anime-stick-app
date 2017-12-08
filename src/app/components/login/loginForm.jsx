import React from 'react';
import {Form, Input, Divider} from 'semantic-ui-react';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false
        }
    }

    render() {
        const {email, password, rememberMe } = this.state
        return (
            <div className='login-form'>
                <div className='login-form-background'></div>
                <Form size='large'>
                    <Form.Field>
                        <h1>Sign In</h1>
                    </Form.Field>
                    <Form.Input label='Email' placeholder='Enter email address' type='text' value={email} ></Form.Input>
                    <Form.Input label='Password' placeholder='Enter password' type='password' value={password} ></Form.Input>
                    <Form.Checkbox label='Remember Me' checked={rememberMe} /> 
                    <Form.Field>
                        <a href='#'>Forgot Email or Password</a>
                    </Form.Field>
                    <Form.Button>Login</Form.Button>
                    <Form.Field>
                        <Divider></Divider>
                        New Here? <a href='#'> Sign Up Now!!</a>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

