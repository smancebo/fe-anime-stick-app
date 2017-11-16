import React from 'react';
import EpisodeListItem from './EpisodeListItem';
import {Grid} from 'semantic-ui-react';

export default class EpisodeList extends React.Component {
    
    render() {
        const { episodes } = this.props;

        return (
            <Grid>
                { episodes.map((episode)=> (
                    <EpisodeListItem key={episode.id}  name={episode.name} link={episode.link}  />
                )) }
            </Grid>
        )
    }
}