import React, { Component } from 'react';
import { connect } from 'react-redux';

import InviteList from './InviteList';
<<<<<<< HEAD
import { Divider } from 'antd';
=======
import './Notification.css';
>>>>>>> 37243b62461d394b73268e461ab97c1149a7a503

class Notification extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_INVITES' })
    }

    render() {
        const { invite } = this.props
        return (
<<<<<<< HEAD
            <div>
                <br/>
                <h1 align='center'>Notifications</h1>
                {invite.length > 0 ? 
                <InviteList invite={invite}/>
                :
                <Divider>You have no invites at this time.</Divider>
=======
            <div className="list"
                align="center">
                <h1>Notifications</h1>
                {invite.length > 0 ?
                    <InviteList
                        story_id={invite.story_id}
                        history={this.props.history}
                        invite={invite}
                    />
                    :
                    <p>You have no invites at this time</p>
>>>>>>> 37243b62461d394b73268e461ab97c1149a7a503
                }
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return { invite: rs.notification.invite }
}

export default connect(mapRStoProps)(Notification);