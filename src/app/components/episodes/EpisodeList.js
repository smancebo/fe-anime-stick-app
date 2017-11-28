import React from 'react';
import EpisodeListItem from './EpisodeListItem';
import {Grid} from 'semantic-ui-react';
import PaginatorArray from '../shared/PaginatorArray';

export default class EpisodeList extends React.Component {
    
    render() {
        const { episodes, currentPage, pageSize, selectedElement } = this.props;
        const pEpisodes = new PaginatorArray(episodes);
        return (
            <Grid >
                { pEpisodes.paginate(currentPage, pageSize).map((episode, i)=> (
                    
                    <EpisodeListItem key={episode.id} 
                        name={episode.name} 
                        link={episode.link}
                        selected={i === selectedElement ? true : false} 
                        onEpisodeClick={this.props.onEpisodeClick}  />
                )) }
            </Grid>
        )
    }
}