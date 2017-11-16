import React from 'react';

import { Image } from 'semantic-ui-react';
import config from '../../config/config';

export default class SearchResultItem extends React.Component {
    handleClick(e) {
        console.log('this is the a click');
        e.preventDefault();
    }
    render() {

       return (
           <div className='found-result'>
                <a href="/search"  className='focus-wrap' onClick={this.handleClick} >
                    <div className='wrapper'>
                       <Image src={`${config.API}/image?l=${this.props.image}`} rounded />
                    </div>
                   <p>{this.props.title}</p>
                </a>
           </div>
       )

    }
}

