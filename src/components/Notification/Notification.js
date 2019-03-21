import React, { Component } from 'react';
import { connect } from 'react-redux';

import InviteList from './InviteList';
import { Divider } from 'antd';

class Notification extends Component {

    componentDidMount(){
        this.props.dispatch({ type: 'GET_INVITES' })
    }

    render() {
    const { invite } = this.props
        return (
            <div>
                <br/>
                <h1 align='center'>Notifications</h1>
                {invite.length > 0 ? 
                <InviteList invite={invite}/>
                :
                <Divider>You have no invites at this time.</Divider>
                }
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return {invite: rs.notification.invite}
}

export default connect(mapRStoProps)(Notification);