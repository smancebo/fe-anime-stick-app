import React from 'react'
import {Button, Icon} from 'semantic-ui-react';


export default class PaginatorButton extends React.Component {

    constructor(props) {
        super(props);
        this.generateButton = this.generateButton.bind(this);
    }
    generateButton() {
        const { forward, backward, floated } = this.props;
        let styles = {'textAlign' : 'center', ...this.props.style};
        const baseButton = (icon) => {
            return (
                <Button color='black' floated={floated} size='massive' fluid circular className='paginator-button' onClick={this.props.onClick} style={styles} >
                    <Icon name={icon} />
                </Button>
            )
        }
        if (backward) {
            return baseButton('backward');
        }
        if(forward) {
            return baseButton('forward');
        }
    }
    render() {
        return this.generateButton();
    }
}