import React from 'react';

import { Image } from 'semantic-ui-react';
import config from '../../config/config';
// import {withRouter} from 'react-router';

class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {image, title, link} = this.props;
        this.props.onItemClick({image, title, link})
        e.preventDefault();
    }
    
    render() {

       return (
           <div className='found-result' >
               <a href="/search" className='focus-wrap' onClick={this.handleClick}  >
                    <div className='wrapper'>
                       <Image src={`${config.API}/image/${this.props.image}`} rounded />
                    </div>
                   <p>{this.props.title}</p>
                </a>
           </div>
       )

    }
}

export default (SearchResultItem);

