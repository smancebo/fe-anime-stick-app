import React from 'react';
import { Container } from 'semantic-ui-react';
import EpisodeList from './EpisodeList';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';


export default class EpisodeListContainer extends React.Component {

    constructor(props){
        super(props);
        this.navigate = this.navigate.bind(this);
    }
    componentDidMount() {
        KeyBoardNavigation.setColumns(4);
        const children = this.elEpisodes.querySelector('.ui.grid').children;
        children[0].querySelector('.episode-link').focus();
        
    }

    navigate(e) {
        const children = this.elEpisodes.querySelector('.ui.grid').children;
        KeyBoardNavigation.navigate(children, e, '.episode-link');
    }

    render() {
        const { episodes } = this.props;
        KeyBoardNavigation.reset();

        return (
            <div ref={(div) => {this.elEpisodes = div}} onKeyDown={this.navigate}>
                <Container className='episode-list-container'>
                    <EpisodeList onEpisodeClick={this.props.onEpisodeClick} episodes={episodes} />
                </Container>
            </div>
        )
    }
}