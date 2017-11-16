import React from 'react';
import { Image } from 'semantic-ui-react';

export default class ShowDescription extends React.Component {

    render() {
        const {image, title} = this.props;
        return (
            <div className='found-result'> 
                <Image src={image} rounded />
                <p> {title} </p>
            </div>
        )
    }
}