import React from 'react';
import {Container} from 'semantic-ui-react';
import MainMenu from './components/MainMenu';
import Content from './components/Content'

const Main = () => (
    <Container fluid>
        <MainMenu/>
        <Content/>
    </Container>
)

export default Main;