import React from 'react';
import { Input, Container, Icon, Form } from 'semantic-ui-react';


class Search extends React.Component {

    constructor(props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    state = {
        searchValue: ''
    }

    onSubmit(){
        const {searchValue} = this.state;
        this.props.onSubmit(searchValue);
    }
    handleInputChange(e){
        this.setState({
            searchValue: e.target.value
        });
    }
    render() {
        const { loading } = this.props;
        const { searchValue } = this.state;
        return (
            <div>
                <Container textAlign='center' >
                    <Form onSubmit={this.onSubmit}>
                        <Input value={searchValue} onChange={this.handleInputChange} inverted icon={loading ? <Icon name='circle notched' loading circular inverted />  : <Icon name='search' inverted circular />} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Search;