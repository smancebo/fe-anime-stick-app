import React from 'react';

import { Image } from 'semantic-ui-react';
import config from '../../config/config';
// import {withRouter} from 'react-router';

class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleRef = this.handleRef.bind(this);
    }

    handleClick(e) {
        const {image, title, link} = this.props;
        this.props.onItemClick({image, title, link})
        e.preventDefault();
    }
    handleRef(el) {
        const cls = this;
        setTimeout(() => {
            if (el && cls.props.focus) {
                el.focus()
            }
        },600)
       
    }
    
    render() {

       return (
           <div className='found-result' >
               <a href="/search" className='focus-wrap' ref={this.handleRef} onClick={this.handleClick}  >
                    <div className='wrapper'>
                       <Image src={`${config.API}/image/${this.props.image}`} rounded />
                    </div>
                   <p title={this.props.title}>{this.props.title.substring(0,30)}</p>
                </a>
           </div>
       )

    }
}

export default (SearchResultItem);

