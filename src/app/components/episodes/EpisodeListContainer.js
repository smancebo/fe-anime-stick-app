import React from 'react';
import { Container } from 'semantic-ui-react';
import EpisodeList from './EpisodeList';

export default class EpisodeListContainer extends React.Component {
    render() {
        const { episodes } = this.props;

        return (
            <Container className='episode-list-container'>
                <EpisodeList episodes={episodes} />
            </Container>
        )
    }
}