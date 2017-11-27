import React from 'react';
import ShowDescription from './ShowDescription';
import EpisodeListContainer from './EpisodeListContainer';

import { Grid } from 'semantic-ui-react';
import Loading from '../shared/Loading';
import Api from '../../Services/Api';
import PaginatorButton from '../shared/PaginatorButton';
import PaginatorArray from '../shared/PaginatorArray';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';
import CachedComponent from '../shared/CachedComponent';
import Paginator from '../shared/Paginator';
import EpisodeListItem from './EpisodeListItem';

export default class EpisodeMain extends CachedComponent {

    constructor(props) {
        super(props);
        this.pageSize = 24;
        this.handleEpisodeClick = this.handleEpisodeClick.bind(this);
        this.linkEpisodes = this.linkEpisodes.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage  = this.prevPage.bind(this);
        this.reset = this.reset.bind(this);
    }

    state = {
        episodes: [],
        loading: false,
        currentPage: 1,
        selectedEpisode: 0
    }

    componentDidMount(){
        const {history : {action}} = this.props;
        const { location: { state: show } } = this.props
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

        const { history } = this.props;
        this.setState({ loading: true });
        const { data: videoLink } = await Api.getVideo(link);
        this.setState({ loading: false, selectedEpisode: KeyBoardNavigation.index});
        this.saveCache();
        history.push('/view', {
            url: videoLink.url
        });


    }
   

    linkEpisodes(elemRef) {
        this.dvEpisodes = elemRef;
        console.log(elemRef)
    }

    reset() {
        if (this.dvEpisodes) {
            if (this.dvEpisodes.querySelector('.episode-link'))
            {
                this.dvEpisodes.querySelector('.episode-link').focus()
            }
                
        }

        KeyBoardNavigation.reset();


    }
    nextPage() {
        const { location: { state: show } } = this.props
        const { episodes } = show;

        const { currentPage } = this.state;
        const pResults = new PaginatorArray(episodes);


        if (currentPage < pResults.getTotalPages(this.pageSize)) {
            this.setState({ 'currentPage': currentPage + 1 });
           
        }
    }

    prevPage() {
        const { currentPage } = this.state;

        if (currentPage > 0) {
            this.setState({ 'currentPage': currentPage - 1 });
            
        }
    }

    render() {
        const { location: { state: show } } = this.props
        const { episodes } = show;
        const { loading, currentPage } = this.state;
        const totalPages = new PaginatorArray(episodes).getTotalPages(this.pageSize);

        return (
            <div>
                <Loading open={loading} />
                <Grid>
                    <Grid.Column width={4} >
                        <ShowDescription image={show.image} title={show.title} />
                    </Grid.Column>
                    <Grid.Column width={12} >
                        <Paginator items={episodes} columns={4} pageSize={24} >
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