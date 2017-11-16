import React from 'react';
import SearchResultItem from './SearchResultsItem'
import { Container, Grid, Icon } from 'semantic-ui-react';
import Loading from '../shared/Loading'


export default class SearchResults extends React.Component {
    componentDidMount() {
        console.log(this.results)
    }
    
    render() {
        const { results, loading } = this.props;

        return (
            <Container className='results'  >
                <Loading loading={loading} />
                <Grid>
                    {results.map((found) => (
                        <Grid.Column width={4} key={found.id} >
                            <SearchResultItem ref={(el) => this.results = el} image={found.image} title={found.title} />
                        </Grid.Column>
                    ))}
                </Grid>
                
            </Container>

        )
    }
}