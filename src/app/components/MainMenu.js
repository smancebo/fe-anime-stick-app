import React from 'react';
import {Segment, Menu, Icon} from 'semantic-ui-react';
import {Link, Route} from 'react-router-dom';
import {withRouter} from 'react-router';

 

class MainMenu extends React.Component
{
    render(){
        const {location} = this.props;
        return (
           
            <Segment inverted>
                <Route />
                <Menu inverted secondary>
                    <Menu.Item name='home' active={location.pathname === '/home'} as={Link} to='/home' onClick={this.handleClick} >
                        <Icon inverted circular name='tv' /> Home
                    </Menu.Item>
                    <Menu.Item name='search' active={location.pathname === '/search'} as={Link} to='/search' onClick={this.handleClick} >
                        <Icon inverted circular name='search' /> Search
                    </Menu.Item>
                    <Menu.Item name='mylist' active={location.pathname === '/my-list'} as={Link} to='/my-list' onClick={this.handleClick} >
                        <Icon inverted circular name='unordered list' /> My List
                    </Menu.Item>
                </Menu>
            </Segment>
        )
    }
} 

export default withRouter(MainMenu);
