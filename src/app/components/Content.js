import React from 'react';
import {Container} from 'semantic-ui-react';
import {Route, Switch} from 'react-router-dom';
import SearchMain from './search/SearchMain';
import EpisodesMain from './episodes/EpisodeMain';
import ViewEpidodeMain from './viewEpisode/ViewEpidodeMain';

const Content = () => (
    <Container>
        <Switch>
            <Route path='/search' component={SearchMain} />
            <Route path='/episodes' component={EpisodesMain} />
            <Route path='/view' component={ViewEpidodeMain} />
        </Switch>
    </Container>
)

export default Content;