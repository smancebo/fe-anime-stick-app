
import React from 'react';
import { Icon, Modal, Container } from 'semantic-ui-react';


export default class Loading extends React.Component {
    render() {
        const { open } = this.props;
        return (
            <Modal open={open} closeOnEscape={false} closeOnRootNodeClick={false} basic size="tiny">
                <Modal.Content>
                    <Container textAlign='center'>
                        <Icon name='circle notched' size='massive' loading inverted />
                    </Container>
                </Modal.Content>
            </Modal>
        )
    }
    
}
