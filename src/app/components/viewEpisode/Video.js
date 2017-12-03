import React from 'react';
// import videojs from 'video.js';
// import 'videojs-overlay/dist/videojs-overlay.min.js';
// import overlay from 'videojs-overlay';
// import 'video.js/dist/video-js.min.css';
import 'video-react/dist/video-react.css';
import { Player, LoadingSpinner, ControlBar, BigPlayButton } from 'video-react';
import Loading from '../shared/Loading';



export default class Video extends React.Component {

    constructor(props) {
        super(props);
        this.playVideo = this.playVideo.bind(this);
        this.bindVideo = this.bindVideo.bind(this);
        this.videoChangeState = this.videoChangeState.bind(this);
        this.state = {
            loading: true,
            canPlay: false
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
    videoChangeState(state, prevState){
        const { hasStarted, readyState, duration } = state;
        const {loading} = this.state;
        
        if (loading && duration > 0){
            this.setState({ loading: false, canPlay: true });
            
            this.player.video.video.click();
        }
    }
    bindVideo(videoNode) {
        if(videoNode){
            this.player = videoNode;
            this.player.subscribeToStateChange(this.videoChangeState);
        }
    }

    render() {
        const { videoLink } = this.props;
        const { loading, canPlay } = this.state;
        return (

            <div>
                <Loading open={loading} />

                <div style={{ display: canPlay ? 'block' : 'none' }}>
                    {
                        videoLink &&
                        <Player fluid={false} width={1920} height={1080} ref={this.bindVideo} autoPlay preload='metadata'>
                            <source src={videoLink} type='video/mp4' />
                            <LoadingSpinner/>
                            <ControlBar autoHide={true} />
                            <BigPlayButton position="center" />
                        </Player>
                    }
                </div>

            </div>
        )
    }



}