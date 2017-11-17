import React from 'react';
import Video from './Video';

export default class ViewEpisodeMain extends React.Component
{

    state = {
        videoLink: ''
    }
    componentDidMount() {
        const {location : {state : video}} = this.props;
       this.setState({videoLink: video.url});
    }

    render(){
        const {videoLink} = this.state;

        return (
            <Video videoLink={videoLink} />
        )
    }
}