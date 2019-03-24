import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Typography, Icon, Badge } from 'antd';

const { Text } = Typography;

class NavigationLink extends Component {
    render() {
        // console.log('in navigation link render', this.props);
        const { route, name, iconType } = this.props.routeObj;
        let onClickFxn = this.props.handleSideBar.bind(this, false);
        if (name === 'Log Out') {
            onClickFxn = () => this.props.dispatch({ type: 'LOGOUT' })
        }
        const textStyle = { color: 'inherit', fontSize: '16px' };

        return (
            <NavLink exact to={route} onClick={onClickFxn} activeClassName='nav-link-active' className='nav-link-default'>
                <div className='nav-link-div'>
                    {name === 'Notifications' ?
                        (<Badge count={this.props.notificationCount}><Text style={textStyle}><Icon type={iconType} style={textStyle} /> &nbsp; {name}</Text></Badge>)
                        : (<Text style={textStyle}><Icon type={iconType} style={textStyle} /> &nbsp; {name}</Text>)}
                </div>
            </NavLink>
        )
    }
}

// {this.props.story ?
//     (<ContributedStoryList history={this.props.history} />) : (<p>loading...</p>)}

const mapStateToProps = reduxStore => ({
    invite: reduxStore.notification.invite,
});

export default connect(mapStateToProps)(NavigationLink);
