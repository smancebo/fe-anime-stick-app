import React from 'react';

import { Image, Transition } from 'semantic-ui-react';
import config from '../../config/config';
// import {withRouter} from 'react-router';

class SearchResultItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleRef = this.handleRef.bind(this);
        this.state = {selected: false}
    }

    componentDidMount(){
        const {selected} = this.props;
        this.setState({selected});
    }

    componentWillReceiveProps(newProps){
        const {selected} = newProps;
        this.setState({selected});
    }

    handleClick(e) {
        const { image, title, link } = this.props;
        this.props.onItemClick({ image, title, link })
        e.preventDefault();
    }
    handleRef(el) {
       if(el){
           this.showLink = el
       }
    }

    render() {

        const { selected } = this.state;
        let { title } = this.props;
        title = title || "";

        if (this.showLink && selected) {
            setTimeout(() => {
                this.showLink.focus();
            }, 0)
        }

        return (
            
                <div className='found-result' >
                    <a href="/search" className='focus-wrap' ref={this.handleRef} onClick={this.handleClick}  >
                        <div className='wrapper'>
                            <Image src={`${config.API}/image/${this.props.image}`} rounded />
                        </div>
                        <p title={title}>{title.substring(0, 30)}</p>
                    </a>
                </div>
            
        )

    }
}

export default (SearchResultItem);

