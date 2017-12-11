import React from 'react';
// import videojs from 'video.js';
// import 'videojs-overlay/dist/videojs-overlay.min.js';
// import overlay from 'videojs-overlay';
// import 'video.js/dist/video-js.min.css';
import 'video-react/dist/video-react.css';
import { Player, LoadingSpinner, ControlBar, BigPlayButton, Shortcut } from 'video-react';
import Loading from '../shared/Loading';
import classNames from 'classnames';
import { Icon } from 'semantic-ui-react';
import { playerShortcuts } from './PlayerShorcuts';
import config from '../../config/config';

const FORWARD = 'FORWARD';
const BACKWARD = 'BACKWARD';




export default class Video extends React.Component {
   
    constructor(props) {
        super(props);
        this.playVideo = this.playVideo.bind(this);
        this.bindVideo = this.bindVideo.bind(this);
        this.videoChangeState = this.videoChangeState.bind(this);
        this.handlePlayerControls = this.handlePlayerControls.bind(this);
        this.playPauseVideo = this.playPauseVideo.bind(this);
        this.backwardVideo = this.backwardVideo.bind(this);
        this.fordwardVideo = this.fordwardVideo.bind(this);
      
        this.state = {
            loading: true,
            canPlay: false
        }

       

    }

    componentDidMount() {
        this.forceUpdate();
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
    videoChangeState(state, prevState) {
        const { duration } = state;
        const { loading } = this.state;

        if (loading && duration > 0) {
            this.setState({ loading: false, canPlay: true });
        }
        
        
        this.setState({ player: state });
    }
    bindVideo(videoNode) {
        if (videoNode) {
            this.player = videoNode;
            videoNode.video.video.parentElement.focus();
            // console.log(videoNode.video.video.parentElement);
            // console.log(this.player);
            this.player.video.video.addEventListener('play', (e) => {
                e.target.parentElement.focus();
            })
            this.backwardVideo();
            this.player.subscribeToStateChange(this.videoChangeState);
        }
    }

    playPauseVideo(e) {
        if (this.player) {
            const { player } = this.state;

            if (player.paused) {
                this.player.play();
            } else {
                this.player.pause();
            }
        }
    }
    backwardVideo(e) {
        this.player.video.replay(10);
        this.setState({ seekingTo: BACKWARD })
        //this.seek(-10);
    }

    seek(time) {
        if(this.player){
            const {player : {currentTime}} = this.state;
            this.player.video.seek(currentTime + time);
        }
    }

    fordwardVideo(e){
        const operation = {
            action: 'forward-30',
            source: 'shortcut'
        };
        this.player.video.forward(10, operation);
        this.setState({seekingTo: FORWARD})
        //this.seek(10);
    }

    handlePlayerControls(e) {
        switch (e.keyCode) {
            case 179:  //play/pause
                this.playPauseVideo(e);
                break;

            case 227: //backward
                this.backwardVideo(e);
                break;

            case 228: //forward
                this.fordwardVideo(e);
                break;

            case 66:
                this.backwardVideo(e)
                break;

            case 78: 
                this.fordwardVideo(e);
                break;

            default:
                e.preventDefault();
                break;
        }

    }

  

    render() {
        const { title, episode } = this.props;
        let { videoLink } = this.props;
        const { loading, canPlay, player, seekingTo } = this.state;
        const overlayClasses = classNames({
            'video-overlay' : true,
            'paused' : (player && player.paused) || false,
            'seeking' : (player && player.seeking) || false,
            'forward': (seekingTo === FORWARD && (player && player.seeking)),
            'backward': (seekingTo === BACKWARD && (player && player.seeking))
        })

        if(videoLink.indexOf('openload') !== -1) {
            videoLink = `${config.API}/watch?video=${videoLink}`;
        }
        return (
            
            <div  ref={(elm) => { elm && (this.videoHolder = elm) }}  onKeyDown={this.handlePlayerControls}>
               
                <Loading open={loading} />
                
                <div className={overlayClasses} style={{ display: canPlay ? 'block' : 'none' }}>
                    <div className="video-overlay-bg"></div>
                    <div className='video-overlay-icons'>
                        <Icon name='forward' className='forward' circular inverted />
                        <Icon name='backward' className='backward' circular inverted />
                    </div>
                    <div className='video-overlay-title'>
                        <h2>{`${title} - ${episode}`}</h2>
                    </div>
                    {
                        videoLink &&
                        
                            <Player fluid={false} width={1920} height={1080} ref={this.bindVideo} autoPlay preload='metadata'>
                                <source src={videoLink} type='video/mp4' />
                                <LoadingSpinner />
                                <ControlBar autoHide={true} />
                                <BigPlayButton position="center" />
                                <Shortcut shortcuts={playerShortcuts} />
                            </Player>
                        
                    }
                </div>

            </div>
        )
    }



}