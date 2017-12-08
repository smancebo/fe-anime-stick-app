import React from 'react';
import LoginForm from './loginForm';
import { Grid, Container } from 'semantic-ui-react';
import ikuapp from '../../assets/images/ikuapp.jpg';


export default class Login extends React.Component
{
    render() {
        return (
            <Container fluid>
                <div className='login-bg'>
                    <LoginForm />
                </div>
            </Container>
            // <Grid>
            //     <Grid.Column width={4}>
            //         <LoginForm />
            //     </Grid.Column>
            // </Grid>
        )
    }
}