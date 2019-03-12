import React, { Component } from 'react';
import { connect } from 'react-redux';

import InviteList from './InviteList';

class Notification extends Component {

    componentDidMount(){
        this.props.dispatch({ type: 'GET_INVITES' })
    }

    render() {
    const { invite } = this.props
        return (
            <div>
                <h1>Notifications</h1>
                {invite.length > 0 ? 
                <InviteList invite={invite}/>
                :
                <p>You have no invites at this time</p>
                }
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return {invite: rs.notification.invite}
}

export default connect(mapRStoProps)(Notification);