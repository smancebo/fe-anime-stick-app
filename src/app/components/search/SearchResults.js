import React from 'react';
import SearchResultItem from './SearchResultsItem'
import { Grid } from 'semantic-ui-react';
import Loading from '../shared/Loading';
import KeyBoardNavigation from '../shared/KeyBoardNavigation';


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
    }

    navigate(e) {
        const children = this.elResults.firstChild.children;
        KeyBoardNavigation.navigate(children, e, '.focus-wrap');
 
    }
    searchFocus() {
      this.props.searchFocus();  
    }
    render() {
        const { results, loading } = this.props;
        KeyBoardNavigation.reset();
        return (
            <div className='results' ref={this.linkElement} onKeyDown={this.navigate} onFocus={this.handleFocus} >
                <Loading loading={loading} />
                <Grid>
                    {results.map((found) => (
                        <Grid.Column width={4} key={found.id} >
                            <SearchResultItem onItemClick={this.props.onItemClick} link={found.link}  image={found.image} title={found.title} />
                        </Grid.Column>
                    ))}
                </Grid>
                
            </div>

        )
    }
}