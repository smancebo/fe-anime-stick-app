import React from 'react'
import Search from './Search';
import SearchResults from './SearchResults'
import Api from '../../Services/Api';

export default class SearchMain extends React.Component
{

    constructor(props) {
        super(props);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    state = {
        searchResults: [],
        loading: false
    }

    async onSearchSubmit(text) {
        this.setState({loading: true, searchResults: []});
        const { data: searchResults} = await Api.search(text);
        console.log(searchResults);
        this.setState({loading: false, searchResults})
    }
    
    render() {
        const {searchResults, loading} = this.state;
        return (
            <div>
                <Search onSubmit={this.onSearchSubmit} loading={loading} />
                <br/>
                <SearchResults results={searchResults} />
            </div>
        )
    }
}