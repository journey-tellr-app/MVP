import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Avatar, Icon } from 'antd';

class Notification extends Component {

    componentDidMount(){
        this.props.dispatch({ type: 'GET_INVITES' })
    }

    render() {
        return (
            <div>
                <h1>Notifications</h1>
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return {notifications: rs.contributor.invite}
}

export default connect(mapRStoProps)(Notification);