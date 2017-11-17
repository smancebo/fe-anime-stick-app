import React from 'react';
import ShowDescription from './ShowDescription';
import EpisodeListContainer from './EpisodeListContainer';

import { Container, Grid } from 'semantic-ui-react';
import Loading from '../shared/Loading';
import Api from '../../Services/Api';

export default class EpisodeMain extends React.Component {

    constructor(props) {
        super(props);
        this.handleEpisodeClick = this.handleEpisodeClick.bind(this);
    }

    state = {
        episodes: [],
        loading: false
    }
    async handleEpisodeClick(name, link) {

        const { history } = this.props;
        this.setState({ loading: true });
        const { data: videoLink } = await Api.getVideo(link);
        this.setState({ loading: false });

        history.push('/view', {
            url: videoLink.url
        });


    }
    render() {
        const { location: { state: show } } = this.props
        const { episodes } = show;
        const { loading } = this.state;

        return (
            <Container>
                <Loading open={loading} />
                <Grid>
                    <Grid.Column width={4} >
                        <ShowDescription image={show.image} title={show.title} />
                    </Grid.Column>
                    <Grid.Column width={12} >
                        <EpisodeListContainer episodes={episodes} onEpisodeClick={this.handleEpisodeClick} />
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}