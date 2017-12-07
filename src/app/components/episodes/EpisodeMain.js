import React from 'react';
import ShowDescription from './ShowDescription';


import { Grid } from 'semantic-ui-react';
import Loading from '../shared/Loading';
import Api from '../../Services/Api';

import KeyBoardNavigation from '../shared/KeyBoardNavigation';
import CachedComponent from '../shared/CachedComponent';
import Paginator from '../shared/Paginator';
import EpisodeListItem from './EpisodeListItem';

export default class EpisodeMain extends CachedComponent {

    constructor(props) {
        super(props);
        this.handleEpisodeClick = this.handleEpisodeClick.bind(this);
        this.onNextPage = this.onNextPage.bind(this)
        this.onBackPage = this.onBackPage.bind(this)
        KeyBoardNavigation.removeAllListeners();
    }

    state = {
        episodes: [],
        loading: false,
        selectedEpisode: 0,
        currentPage: 1
    }

    componentDidMount(){
        const {history : {action}} = this.props;
        
        if(action === 'PUSH') {
            this.clearCache();
            KeyBoardNavigation.index = 0;
        } else {
            this.restoreCache();
            const {selectedEpisode} = this.state;
            KeyBoardNavigation.index = selectedEpisode;
        }
    }

    
    async handleEpisodeClick(name, link, target) {

        const { history, location: { state: show } } = this.props;
        this.setState({ loading: true, selectedEpisode: KeyBoardNavigation.index });
        
        const { data: videoLink } = await Api.getVideo(link);
        
        this.setState({ loading: false});
        this.saveCache();
        history.push('/view', {
            url: videoLink.url,
            title: show.title,
            episode: name
        });
    }

    onNextPage(currentPage){
        this.setState({currentPage})
    }

    onBackPage(currentPage){
        this.setState({currentPage})
    }

    render() {
        const { location: { state: show } } = this.props
        const { episodes } = show;
        const { loading, selectedEpisode, currentPage } = this.state;
       

        return (
            <div className="paginator" >
                <Loading open={loading} />
                <Grid style={{marginLeft: '149px'}}>
                    <Grid.Column width={3} textAlign='center' >
                        <ShowDescription image={show.image} title={show.title} />
                    </Grid.Column>
                    <Grid.Column width={12} >
                        <Paginator items={episodes} 
                                    
                                   columns={4} 
                                   onNextPage={this.onNextPage}
                                   onBackPage={this.onBackPage}
                                   selectedPage={currentPage}
                                   pageSize={24} selectedElement={selectedEpisode} >
                            <Paginator.Paginate className='episode-list-container'>
                                <EpisodeListItem onEpisodeClick={this.handleEpisodeClick} />
                            </Paginator.Paginate>
                        </Paginator>

                        {/* <Grid>
                            <Grid.Column width={2} verticalAlign='middle' className='paginator-left'>
                                <PaginatorButton backward floated='left' onClick={this.prevPage} style={{ 'display': currentPage === 1 ? 'none' : 'block' }} />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <div className='episodes' ref={this.linkEpisodes}>
                                    <EpisodeListContainer pageSize={this.pageSize} currentPage={currentPage} episodes={episodes} onEpisodeClick={this.handleEpisodeClick} />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2} verticalAlign='middle' className='paginator-right'>
                                <PaginatorButton forward floated='right' onClick={this.nextPage} style={{ 'display': currentPage === totalPages ? 'none' : 'block' }} />
                            </Grid.Column>
                        </Grid> */}


                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}