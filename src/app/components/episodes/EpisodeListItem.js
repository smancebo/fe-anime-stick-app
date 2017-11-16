
import React from 'react';
import {Grid} from 'semantic-ui-react';


export default class EpisodeListItem extends React.Component {
    render() {
        const {name, link} = this.props;
        return (
            <Grid.Column width={2} textAlign='center' >
                <a href="/episode" className='episode-link'>
                    <span className='episode'>{name}</span>
                </a>
            </Grid.Column>
            
        )
    }
}