import React from 'react';
import { Input, Container, Icon, Form } from 'semantic-ui-react';


class Search extends React.Component {


    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.linkTextRef = this.linkTextRef.bind(this);

    }

    componentWillReceiveProps(newProps) {
        if (newProps.searchStr !== '') {
            this.setState({ searchValue: newProps.searchStr })
        }
    }

    state = {
        searchValue: ''
    }

    onSubmit() {
        const { searchValue } = this.state;
        this.props.onSubmit(searchValue);
        this.searchInput.inputRef.blur();
    }
    handleInputChange(e) {
        this.setState({
            searchValue: e.target.value
        });
    }
    handleKeyDown(e) {
        if (e.keyCode === 40) {
            this.props.onDownKeyPressed();
            e.preventDefault();
        }

        if(e.keyCode === 9) {
            this.onSubmit();
        }

        if (e.keyCode === 179) {
            this.onSubmit();
        }
    }
    linkTextRef(el) {
        this.props.searchRef(el);
        this.searchInput = el
    }
    render() {
        const { loading } = this.props;
        const { searchValue } = this.state;
        return (
            <div>
                <Container textAlign='center' >
                    <Form onSubmit={this.onSubmit}>
                        <Input value={searchValue} className='search-input' onKeyDown={this.handleKeyDown} ref={this.linkTextRef} onChange={this.handleInputChange} inverted icon={loading ? <Icon name='circle notched' loading circular inverted /> : <Icon name='search' inverted circular />} />
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Search;