import React from 'react';
import SearchResultItem from './SearchResultsItem'
import { Grid } from 'semantic-ui-react';
import Loading from '../shared/Loading'


export default class SearchResults extends React.Component {
   
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.linkElement = this.linkElement.bind(this);
        this.searchFocus = this.searchFocus.bind(this);
    }

    index = 0;
    linkElement(el){
        this.elResults = el;
        this.props.parentRef(el);
    }

    navigate(e) {
        const children = this.elResults.firstChild.children;
        const focusChild = (index) => {
            children[index].querySelector('.focus-wrap').focus();
        }

        //Right Arrow
        if (e.keyCode === 39) {
            this.index += 1;
            if(this.index < children.length ){
                focusChild(this.index);
            } else {
                this.index = children.length - 1;
            }
            return;
        }

        //Left Arrow
        if(e.keyCode === 37) {
            this.index -= 1;
            if(this.index >= 0) {
                focusChild(this.index);
            }else {
                this.index = 0;
            }
            return;
        }

        //Up Key
        if(e.keyCode === 38) {
            this.index -= 4;
            if(this.index >=0) {
                focusChild(this.index)
            } else {
                this.index = 0;
                this.searchFocus();
            }
            e.preventDefault();
            return;
        }

        //Down Key
        if(e.keyCode === 40) {

            this.index += 4;
            if(this.index < children.length) {
                focusChild(this.index);
            } else {
                this.index -=  4;
            }

            e.preventDefault();
            return;
        }

        if(!e.keyCode === 13) {
            e.preventDefault();
        }
        
    }
    searchFocus() {
      this.props.searchFocus();  
    }
    render() {
        const { results, loading } = this.props;
        this.index = 0;
        return (
            <div className='results' ref={this.linkElement} onKeyDown={this.navigate} onFocus={this.handleFocus} >
                <Loading loading={loading} />
                <Grid>
                    {results.map((found) => (
                        <Grid.Column width={4} key={found.id} >
                            <SearchResultItem link={found.link}  image={found.image} title={found.title} />
                        </Grid.Column>
                    ))}
                </Grid>
                
            </div>

        )
    }
}