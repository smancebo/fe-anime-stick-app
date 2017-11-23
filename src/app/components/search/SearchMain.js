import React from 'react'
import Search from './Search';
import SearchResults from './SearchResults'
import Api from '../../Services/Api';
import config from '../../config/config';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';
import Loading from '../shared/Loading';
import PaginatorArray from '../shared/PaginatorArray';
import PaginatorButton from '../shared/PaginatorButton';
import {Grid} from 'semantic-ui-react';
import CachedComponent from '../shared/CachedComponent'

let state = { searchResults: [], loading: false, currentPage: 1, searchStr: '' };

export default class SearchMain extends CachedComponent {

    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.linkElement = this.linkElement.bind(this);
        this.linkSearchRef = this.linkSearchRef.bind(this);
        this.searchFocus = this.searchFocus.bind(this);
        this.handleDownKeyPress = this.handleDownKeyPress.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.reset = this.reset.bind(this);
        this.pageSize = 4;
    }

    state = state

    componentDidMount() {
        this.searchRef.focus();
        KeyBoardNavigation.setColumns(4);
        this.restoreCache();
        this.reset();
    }


    

    async onSearchSubmit(text) {
        if (text !== '') {
            this.setState({ searchResults: [], loading: true });

            const { data: searchResults } = await Api.search(text);

            this.setState({ searchResults, loading: false, currentPage: 1, searchStr: text })
            this.saveCache();
            if (searchResults.length > 0) {

                this.element.querySelector('.focus-wrap').focus();
            }
        }
    }
    linkSearchRef(el) {
        this.searchRef = el;
    }
    linkElement(el) {
        this.element = el;
    }

    searchFocus() {
        this.searchRef.focus()
    }
    handleDownKeyPress() {
        this.element.querySelector('.focus-wrap').focus();
        KeyBoardNavigation.reset();


    }
    async handleItemClick(item) {
        const { history } = this.props;
        const { image, title, link } = item;

        this.setState({ loading: true });

        const { data: episodes } = await Api.getEpisodes(link);

        this.setState({ loading: false });
        this.saveCache();
        history.push('/episodes', {
            image: `${config.API}/image/${image}`,
            title,
            link,
            episodes
        })

    }

    reset() {
        if (this.elResults) {
            if (this.elResults.querySelector('.focus-wrap'))
                this.elResults.querySelector('.focus-wrap').focus()
        }

        KeyBoardNavigation.reset();


    }
    nextPage() {
        const { currentPage, searchResults } = this.state;
        const pResults = new PaginatorArray(searchResults);


        if (currentPage < pResults.getTotalPages(this.pageSize)) {
            this.setState({ 'currentPage': currentPage + 1 });
            this.reset();
        }
    }

    prevPage() {
        const { currentPage } = this.state;

        if (currentPage > 0) {
            this.setState({ 'currentPage': currentPage - 1 });
            this.reset();
        }
    }

    render() {

        const { searchResults, loading, currentPage, searchStr } = this.state;
        const pResults = new PaginatorArray(searchResults);
        const totalPages = pResults.getTotalPages(this.pageSize);
        return (
            <div>
                <Loading open={loading} />
                <Search searchStr={searchStr} onDownKeyPressed={this.handleDownKeyPress} searchRef={this.linkSearchRef} onSubmit={this.onSearchSubmit} loading={loading} />
                
                <Grid className='search-results'>
                    <Grid.Column width={2} verticalAlign='middle' className='paginator-left'>
                        <PaginatorButton backward floated='left' onClick={this.prevPage} style={{ 'display': currentPage === 1 ? 'none' : 'block' }} />
                    </Grid.Column>
                    <Grid.Column width={12} textAlign='center'>
                        <SearchResults currentPage={currentPage} pageSize={this.pageSize} onItemClick={this.handleItemClick} searchFocus={this.searchFocus} parentRef={this.linkElement} results={searchResults} loading={loading} />
                    </Grid.Column>
                    <Grid.Column width={2} verticalAlign='middle' className='paginator-right'>
                        {searchResults.length > 0 && <PaginatorButton forward floated='right' onClick={this.nextPage} style={{ 'display': currentPage === totalPages ? 'none' : 'block' }} />}
                    </Grid.Column>
                </Grid>
                
            </div >
        )
    }
}


