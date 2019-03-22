import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubHeader from '../Common/SubHeader';
import InviteList from './InviteList';
import { Divider } from 'antd';

class Notification extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_INVITES' })
    }

    render() {
        const { invite } = this.props
        return (
            <div>
                {/* <div>
                <br/>
                <h1 align='center'>Notifications</h1>
                {invite.length > 0 ? 
                (<InviteList invite={invite}/>)
                :
                (<Divider>You have no invites at this time.</Divider>)}
            </div> */}
                <div className="list"
                    align="center">
                    <SubHeader headerText='Notifications' />
                    {/* <h1>Notifications</h1> */}
                    {invite.length > 0 ?
                        <InviteList
                            story_id={invite.story_id}
                            history={this.props.history}
                            invite={invite}
                        />
                        :
                        <Divider>You have no invites at this time</Divider>

                    }

                </div>
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return { invite: rs.notification.invite }
}

export default connect(mapRStoProps)(Notification);