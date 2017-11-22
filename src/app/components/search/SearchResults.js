import React from 'react';
import SearchResultItem from './SearchResultsItem'
import { Grid, Transition } from 'semantic-ui-react';
import Loading from '../shared/Loading';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';
import PaginatorArray from '../shared/PaginatorArray';

export default class SearchResults extends React.Component {
   
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.linkElement = this.linkElement.bind(this);
        this.searchFocus = this.searchFocus.bind(this);

        
        
    }

    componentDidMount(){
        KeyBoardNavigation.on('onLastUp', (args) => {
            this.searchFocus();
        })
    }
    componentWillUnmount() {
        KeyBoardNavigation.removeAllListeners();
    }

    
    linkElement(el){
        this.elResults = el;
        this.props.parentRef(el);
        console.log(this.elResults);
    }

    navigate(e) {
        const children = this.elResults
                         .querySelector('.ui.grid').children;

        KeyBoardNavigation.navigate(children, e, '.focus-wrap');
 
    }
    searchFocus() {
        this.props.searchFocus();  
    }

    render() {
        const { results, loading, currentPage, pageSize } = this.props;
    
        const pResults = new PaginatorArray(results);

        return (
            <div className='results' ref={this.linkElement} onKeyDown={this.navigate} onFocus={this.handleFocus} >
                <Loading loading={loading} />
                <Transition.Group as={Grid} duration={500} animation='scale'>
                    {pResults.paginate(currentPage, pageSize).map((found, i) => (

                        <Grid.Column width={4} key={found.id} >
                            <div>
                                {found.focus = (i === 0) ? true : false}
                                <SearchResultItem onItemClick={this.props.onItemClick} focus={found.focus} link={found.link} image={found.image} title={found.title} />
                            </div>
                        </Grid.Column>
                    ))}
                </Transition.Group>
            </div>

        )
    }
}