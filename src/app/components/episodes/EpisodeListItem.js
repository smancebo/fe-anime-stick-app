
import React from 'react';
import {Grid} from 'semantic-ui-react';


export default class EpisodeListItem extends React.Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleRef = this.handleRef.bind(this);
        this.state = {
            selected: false
        }
    }

    handleClick(e) {
        const {onEpisodeClick, name, link} = this.props;
        onEpisodeClick(name, link, e.target);
        e.preventDefault();
    }
    handleRef(el) {
        this.episodeLink = el;
    }

    componentDidMount(){
        if(this.props.selected) {
            this.setState({ selected: this.props.selected })
        }
    }
    componentWillReceiveProps(newProps){
        console.log(newProps);
        this.setState({selected: newProps.selected})
        
    }

    render() {
        const {name} = this.props;
        const { selected } = this.state
        if(this.episodeLink && selected){
            this.episodeLink.focus();
        }
       
        return (
            <Grid.Column width={4} textAlign='center' >
                <a href="/episode" className='episode-link' ref={this.handleRef} onClick={this.handleClick} >
                    <span className='episode'>{name}</span>
                </a>
            </Grid.Column>
            
        )
    }
}