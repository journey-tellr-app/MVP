import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { Typography, Icon } from 'antd';

const { Text } = Typography;

class NavigationLink extends Component {
    handleClick = () => {
        console.log('historypush');
        this.props.history.push(this.props.route);
    }

    render() {
        console.log('in navigation link render');
        const { route, name, iconType } = this.props.routeObj;
        let onClickFxn = this.props.onClose;
        if (name === 'Log Out') {
            onClickFxn = () => this.props.dispatch({ type: 'LOGOUT' })
        }
        const textStyle = { color: 'inherit', fontSize: '16px' };
        // console.log(this.props);
        return (
            <NavLink exact to={route} onClick={onClickFxn} activeClassName='nav-active'>
                <div className='nav-link-div'>
                    <Text style={textStyle}><Icon type={iconType} style={textStyle} /> &nbsp; {name}</Text>
                </div>
            </NavLink>
        )
    }
}

export default connect()(NavigationLink);
