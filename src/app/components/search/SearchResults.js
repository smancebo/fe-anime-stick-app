import React from 'react';
import SearchResultItem from './SearchResultsItem'
import { Container, Grid } from 'semantic-ui-react';



export default class SearchResults extends React.Component {
    render() {
        const { results } = this.props;

        return (
            <Container>
                <Grid>
                    {results.map((found) => (
                        <Grid.Column width={4} key={found.id} >
                            <SearchResultItem image={found.image} title={found.title} />
                        </Grid.Column>
                    ))}
                </Grid>
                
            </Container>

        )
    }
}