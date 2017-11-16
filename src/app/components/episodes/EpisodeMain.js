import React from 'react';
import ShowDescription from './ShowDescription';
import EpisodeListContainer from './EpisodeListContainer';

import {Container, Grid} from 'semantic-ui-react';
import Api from '../../Services/Api';

export default class EpisodeMain extends React.Component
{
    async componentDidMount() {
        const { location: { state: show } } = this.props
        const {data : episodes} = await Api.getEpisodes(show.link)
        console.log(episodes)
        this.setState({
            episodes
        })
    }
    state = {
        episodes: []
    }
    render() {
        const {episodes} = this.state;
        const {location : {state : show} }  = this.props
       
        return (
            <Container>
                <Grid>
                    <Grid.Column width={4} >
                        <ShowDescription image={show.image} title={show.title} />
                    </Grid.Column>
                    <Grid.Column width={12} >
                        <EpisodeListContainer episodes={episodes}  />
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}