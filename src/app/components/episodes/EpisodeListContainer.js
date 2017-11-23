import React from 'react';
import { Container } from 'semantic-ui-react';
import EpisodeList from './EpisodeList';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';


export default class EpisodeListContainer extends React.Component {

    constructor(props){
        super(props);
        this.navigate = this.navigate.bind(this);
        this.state = {
            selectedElement: 0
        }
    }
    componentDidMount() {
        KeyBoardNavigation.setColumns(4);
        const children = this.elEpisodes.querySelector('.ui.grid').children;
        children[0].querySelector('.episode-link').focus();
        
        
    }

    navigate(e) {
        const children = this.elEpisodes.querySelector('.ui.grid').children;
        KeyBoardNavigation.navigate(children, e, '.episode-link');
        this.setState({selectedElement: KeyBoardNavigation.index});
    }

    render() {
        const { episodes } = this.props;
        const { selectedElement } = this.state;
        //KeyBoardNavigation.reset();

        return (
            <div ref={(div) => {this.elEpisodes = div}} onKeyDown={this.navigate}>
                <Container className='episode-list-container'>
                    <EpisodeList selectedElement={selectedElement} onEpisodeClick={this.props.onEpisodeClick} pageSize={this.props.pageSize} currentPage={this.props.currentPage} episodes={episodes} />
                </Container>
            </div>
        )
    }
}