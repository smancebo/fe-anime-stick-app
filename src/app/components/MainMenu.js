import React from 'react';
import {Segment, Menu, Icon} from 'semantic-ui-react';
import {Link, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

 

class MainMenu extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            show: true,
            focus: true
        }
    }
    render(){
        const {location, show, focus} = this.props;
       
        //const toolbarStyle = {transform: `translateY(${show === true ? '0px' : '-80px'})`};
        const toolbarStyle = {display: `${show === true ? 'block' : 'none'}`};

        if(focus) {
            this.toolbar && this.toolbar.querySelector('.item').focus();
        }

        return (
           
               
            <div className='toolbar' ref={(elm) => { elm && (this.toolbar = elm)}} style={toolbarStyle}>
                    <Segment inverted>
                        <Route />
                        <Menu inverted secondary>
                            <Menu.Item  name='home' active={location.pathname === '/home'} as={Link} to='/home' onClick={this.handleClick} >
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
                </div>
           
        )
    }
} 

function mapStateToProps(state){
    
    return {
        show: state.Toolbar.show,
        focus: state.Toolbar.focus
    }
}

export default withRouter(connect(mapStateToProps)(MainMenu));
//export default connect(mapStateToProps)(MainMenu);
