import React from 'react';

import { Image } from 'semantic-ui-react';

export default class SearchResultItem extends React.Component {
    render() {

       return (
           <div className='found-result'>
                <div className='wrapper'>
                   <Image src={this.props.image} rounded />
                </div>
               <p>{this.props.title}</p>
           </div>
       )

    }
}

