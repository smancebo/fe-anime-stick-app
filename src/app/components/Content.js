import React from 'react';
import {Container} from 'semantic-ui-react';
import {Route, Switch} from 'react-router-dom';
import SearchMain from './search/SearchMain';
import EpisodesMain from './episodes/EpisodeMain';

const Content = () => (
    <Container>
        <Switch>
            <Route path='/search' component={SearchMain} />
            <Route path='/episodes' component={EpisodesMain} />
        </Switch>
    </Container>
)

export default Content;