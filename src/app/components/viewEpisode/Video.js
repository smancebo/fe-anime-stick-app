import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

export default class Video extends React.Component {

    constructor(props) {
        super(props);
        this.playVideo = this.playVideo.bind(this);
    }
    componentDidMount() {
        if (this.props.videoLink !== '') {
            this.player = videojs(this.videoNode, this.props);
            console.log(this.player);
            //this.player.play();
        }
    }
    componentWillReceiveProps() {
        const {videoLink} = this.props;

        if(this.player){
           this.player.dispose();
       }
        if(videoLink !== '') {
            this.player = videojs(this.videoNode, this.props);
            console.log(this.player);
            //this.player.play();
        }
      
    }
    componentWillUnmount() {
        if(this.player) {
            this.player.dispose();
        }
    }

    playVideo() {
        if(this.player) {

            this.player.requestFullScreen();
        }
    }

    render() {
        const {videoLink} = this.props;
        console.log(videoLink);
        return(
           
            <div data-vjs-player>
                <video ref={node => this.videoNode = node} 
                    controls
                    autoPlay
                    preload="auto"
                    width="640"
                    height="264"
                    onLoadStart={this.playVideo}
                    data-setup="{}"
                    className='video-js' >
                   
                    <source src={videoLink} type='video/mp4' />
                    
                </video>
            </div>
        )
    }



}