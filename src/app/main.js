import React from 'react';
import { Container } from 'semantic-ui-react';
import MainMenu from './components/MainMenu';
import Content from './components/Content'
import Login from './components/login/Login';

const Main = (props) => {
    const main = <Container fluid>
                    <MainMenu />
                    <Content />
                </Container>;

    const login = <Login />

    if(true) {
        return main;
    }
    return login;
}



export default Main;