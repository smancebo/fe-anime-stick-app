
import React from 'react';
import {Grid} from 'semantic-ui-react';


export default class EpisodeListItem extends React.Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {onEpisodeClick, name, link} = this.props;
        onEpisodeClick(name, link);
        e.preventDefault();
    }
    render() {
        const {name} = this.props;
       
        return (
            <Grid.Column width={4} textAlign='center' >
                <a href="/episode" className='episode-link' onClick={this.handleClick} >
                    <span className='episode'>{name}</span>
                </a>
            </Grid.Column>
            
        )
    }
}