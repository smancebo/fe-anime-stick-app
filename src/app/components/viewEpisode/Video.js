import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import Loading from '../shared/Loading';
import {Button} from 'semantic-ui-react';
import FullScreen from 'react-full-screen'

export default class Video extends React.Component {

    constructor(props) {
        super(props);
        this.playVideo = this.playVideo.bind(this);
        this.bindVideo = this.bindVideo.bind(this);
        this.state = {
            loading: true,
            canPlay: false,
            isFullScreen: true
        }
    }


    componentWillUnmount() {
        if (this.player) {
            //this.player.dispose();
        }
    }

    playVideo() {

        if (this.player) {
            this.setState({ loading: false, canPlay: true });
           
            this.player.play();
            
        }
    }

    evaluateVideoLink(videoLink) {


    }
    bindVideo() {
        this.player = videojs(this.videoNode, this.props);
        
    }

    render() {
        const { videoLink } = this.props;
        const { loading, canPlay, isFullScreen } = this.state;
        return (

            <div>
                <Loading open={loading} />

                <div data-vjs-player style={{ display: canPlay ? 'block' : 'none' }}>
                    {videoLink &&
                        
                            <video  ref={node => this.videoNode = node}
                                controls
                                autoPlay
                                preload="auto"
                                data-setup="{}"
                                onCanPlay={this.playVideo}
                                onLoadedMetadata={this.bindVideo}
                                className='video-js episode-video' >
    
                                <source src={videoLink} type='video/mp4' />
                                {/* {this.bindVideo()} */}
                            </video>}
                </div>
                {canPlay &&<Button onClick={this.player.requestFullscreen()}>Go FullScreen</Button>}
            </div>
        )
    }



}