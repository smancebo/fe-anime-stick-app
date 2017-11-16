
import React from 'react';
import { Container, Icon } from 'semantic-ui-react';


export default class Loading extends React.Component {
    render() {
        const { loading } = this.props;
        return (
            loading &&
            <Container className='loading-component' textAlign='center' >
                <Icon name='circle notched' size='massive' loading />
            </Container>
        )
    }
    
}
