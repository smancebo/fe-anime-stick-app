import React from 'react';
import Video from './Video';
import { connect } from 'react-redux';
import { hideToolbar, showToolbar } from '../../../actions/toolbar'

class ViewEpisodeMain extends React.Component
{

    state = {
        videoLink: '',
        title: '',
        episode: ''
    }
    componentDidMount() {
        const {location : {state : video}} = this.props;
        const {url: videoLink, title, episode} = video
       this.setState({videoLink, title, episode});
       this.props.hideToolbar();
    }

    componentWillUnmount(){
        this.props.showToolbar();
    }

    render(){
        const {videoLink, title, episode} = this.state;

        return (
            <div>
                {/* <h3>{title}</h3>
                <h4>{episode}</h4> */}
                <Video videoLink={videoLink} title={title} episode={episode} />
            </div>
        )
    }
}

export default connect(null, {hideToolbar, showToolbar})(ViewEpisodeMain)