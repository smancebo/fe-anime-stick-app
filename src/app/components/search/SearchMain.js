import React from 'react'
import Search from './Search';
import SearchResults from './SearchResults'
import Api from '../../Services/Api';
import config from '../../config/config';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';
import { Modal, Icon, Container} from 'semantic-ui-react';
import Loading from '../shared/Loading';

export default class SearchMain extends React.Component {

    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.linkElement = this.linkElement.bind(this);
        this.linkSearchRef = this.linkSearchRef.bind(this);
        this.searchFocus = this.searchFocus.bind(this);
        this.handleDownKeyPress = this.handleDownKeyPress.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    state = {
        searchResults: [],
        loading: false
    }

    componentDidMount() {
        this.searchRef.focus();
        KeyBoardNavigation.setColumns(4);
    }



    async onSearchSubmit(text) {
        this.setState({ searchResults: [], loading: true });
        
        const {data: searchResults} = await Api.search(text);

        this.setState({ searchResults, loading: false})
        this.element.querySelector('.focus-wrap').focus();
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

        history.push('/episodes', {
            image: `${config.API}/image/${image}`,
            title,
            link,
            episodes
        })

    }
   
    render() {
        
        const {searchResults, loading} = this.state;
        return (
            <div>
                <Loading open={loading} />
                <Search onDownKeyPressed={this.handleDownKeyPress} searchRef={this.linkSearchRef} onSubmit={this.onSearchSubmit} loading={loading} />
                <br />
                <SearchResults onItemClick={this.handleItemClick} searchFocus={this.searchFocus} parentRef={this.linkElement} results={searchResults} loading={loading} />
            </div >
        )
    }
}


