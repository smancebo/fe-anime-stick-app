import React from 'react'
import {Button, Icon} from 'semantic-ui-react';


export default class PaginatorButton extends React.Component {

    constructor(props) {
        super(props);
        this.generateButton = this.generateButton.bind(this);
    }
    generateButton() {
        const { forward, backward } = this.props;

        const baseButton = (icon) => {
            return (
                <Button color='black' className='paginator-button' onClick={this.props.onClick} >
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