import React from 'react';
import {Container} from 'semantic-ui-react';
import {Route, Switch} from 'react-router-dom';
import SearchMain from './search/SearchMain';

const Content = () => (
    <Container>
        <Switch>
            <Route path='/search' component={SearchMain} />
        </Switch>
    </Container>
)

export default Content;