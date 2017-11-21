import React from 'react';
import SearchResultItem from './SearchResultsItem'
import { Grid } from 'semantic-ui-react';
import Loading from '../shared/Loading';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';
import PaginatorButton from '../shared/PaginatorButton';
import PaginatorArray from '../shared/PaginatorArray';

export default class SearchResults extends React.Component {
   
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.linkElement = this.linkElement.bind(this);
        this.searchFocus = this.searchFocus.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.pageSize = 4;
        this.state = {
            'currentPage' : 1
        }
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
    }

    navigate(e) {
        const children = this.elResults
                         .querySelector('.ui.grid')
                         .children[1]
                         .querySelector('.ui.grid').children;

        KeyBoardNavigation.navigate(children, e, '.focus-wrap');
 
    }
    searchFocus() {
        this.props.searchFocus();  
    }
    nextPage() {
        const {currentPage} = this.state;
        const {results} = this.props;

        const pResults = new PaginatorArray(results);


        if(currentPage < pResults.getTotalPages(this.pageSize)) {
            this.setState({'currentPage': currentPage + 1});
        }
    }
    prevPage() {
        const { currentPage } = this.state;
        const { results } = this.props;

        const pResults = new PaginatorArray(results);

        if (currentPage > 0) {
            this.setState({ 'currentPage': currentPage - 1 });
        }
    }
    render() {
        const { results, loading } = this.props;
        const { currentPage } = this.state;
        const pResults = new PaginatorArray(results);
        //console.log(pResults.)
        const totalPages = pResults.getTotalPages(this.pageSize);

        KeyBoardNavigation.reset();
        return (
            <div className='results' ref={this.linkElement} onKeyDown={this.navigate} onFocus={this.handleFocus} >
                <Loading loading={loading} />
                <Grid>
                    <Grid.Column width={1} style={{'display' : currentPage === 1 ? 'none' : 'block'}} >
                       <PaginatorButton backward onClick={this.prevPage} />
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Grid>
                            {pResults.paginate(currentPage, this.pageSize).map((found) => (
                                <Grid.Column width={4} key={found.id} >
                                    <SearchResultItem onItemClick={this.props.onItemClick} link={found.link} image={found.image} title={found.title} />
                                </Grid.Column>
                            ))}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={1} style={{ 'display': currentPage === totalPages ? 'none' : 'block' }}>
                        <PaginatorButton forward onClick={this.nextPage}  />
                    </Grid.Column>
                </Grid>
                
                
            </div>

        )
    }
}