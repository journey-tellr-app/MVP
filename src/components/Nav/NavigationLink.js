import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { Typography, Icon } from 'antd';

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
                    <Text style={textStyle}><Icon type={iconType} style={textStyle} /> &nbsp; {name}</Text>
                </div>
            </NavLink>
        )
    }
}

export default withRouter(connect()(NavigationLink));
