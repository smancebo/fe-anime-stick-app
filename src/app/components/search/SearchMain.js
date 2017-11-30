import React from 'react'
import Search from './Search';

import Api from '../../Services/Api';
import config from '../../config/config';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';
import Loading from '../shared/Loading';
import PaginatorArray from '../shared/PaginatorArray';


import CachedComponent from '../shared/CachedComponent'
import Paginator from '../shared/Paginator'
import SearchResultsItem from './SearchResultsItem';




let state = { searchResults: [], loading: false, currentPage: 1, searchStr: '', selectedElement:0 };

 class SearchMain extends CachedComponent {

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

                //this.element.querySelector('.focus-wrap').focus();
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
        this.setState({
            selectedElement: 99
        })
        this.searchRef.focus()
    }
    handleDownKeyPress() {
        this.setState({
            selectedElement: 0
        })


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
            episodes,
            clear: true
        })

    }

    reset() {
        // if (this.elResults) {
        //     if (this.elResults.querySelector('.focus-wrap'))
        //         this.elResults.querySelector('.focus-wrap').focus()
        // }

        // KeyBoardNavigation.reset();


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

        const { searchResults, loading, searchStr, selectedElement } = this.state;
        
        return (
            <div className='content'>
                <Loading open={loading} />
                <Search searchStr={searchStr} onDownKeyPressed={this.handleDownKeyPress} searchRef={this.linkSearchRef} onSubmit={this.onSearchSubmit} loading={loading} />
                <div className="paginator">
                    <Paginator items={searchResults} pageSize={4} columns={4}  selectedElement={selectedElement} onLastUp={this.searchFocus}>
                        <Paginator.Paginate className='results'>
                            <SearchResultsItem  onItemClick={this.handleItemClick} parentRef={this.linkElement} loading={loading} />
                        </Paginator.Paginate>
                    </Paginator>
                </div>
            </div >
        )
    }
}


export default SearchMain




