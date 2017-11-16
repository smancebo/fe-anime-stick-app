import React from 'react'
import Search from './Search';
import SearchResults from './SearchResults'
import Api from '../../Services/Api';

export default class SearchMain extends React.Component {

    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.linkElement = this.linkElement.bind(this);
        this.linkSearchRef = this.linkSearchRef.bind(this);
        this.searchFocus = this.searchFocus.bind(this);
        this.handleDownKeyPress = this.handleDownKeyPress.bind(this);
    }

    state = {
        searchResults: [],
        loading: false
    }

    componentDidMount() {
        this.searchRef.focus();
    }



    async onSearchSubmit(text) {
        this.setState({
            loading: true,
            searchResults: []
        });
        const {
            data: searchResults
        } = await Api.search(text);

        this.setState({
            loading: false,
            searchResults
        })
        //this.element.children[0].children[0].firstChild.firstChild.focus();
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


    }

    render() {
        const {
            searchResults,
            loading
        } = this.state;
        return (
            <div>
                <Search onDownKeyPressed={this.handleDownKeyPress} searchRef={this.linkSearchRef} onSubmit={this.onSearchSubmit} loading={loading} />
                <br />
                <SearchResults searchFocus={this.searchFocus} parentRef={this.linkElement} results={searchResults} loading={loading} />
            </div >
        )
    }
}