import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Notification.css'

import { List, Avatar, Button } from 'antd';


class InviteList extends Component {
    buildListItems = (item) => {
        return <List.Item>
            <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">title</a>}
                description={item.status}
            />
        </List.Item>
    }

    handleInvite = (invite, status, event) => {
        console.log('error error')
        this.props.dispatch({
            type: `SEND_INVITE_RESPONSE`,
            payload: { invite_id: invite.invite_id, status: status }
        })
        if (status === 'accepted') {
            this.props.history.push(`/existing-story/${invite.story_id}`);
        }
    }



    render() {
        const { invite } = this.props;
        return (

            <List
                className="notification-item"
                itemLayout="horizontal"
                dataSource={invite}
                renderItem={invite => (
                    <List.Item actions={[
                        <Button size="small" id="notification-btn" onClick={this.handleInvite.bind(this, invite, 'accepted')}>Accept</Button>,
                        <Button size="small" id="notification-btn" onClick={this.handleInvite.bind(this, invite, 'rejected')}>Maybe Later</Button>,
                    ]}>
                        <List.Item.Meta
                            avatar={<Avatar src={invite.profile_pic} />}
                            description={`${invite.first_name} ${invite.last_name} invited you to contribute to: "${invite.title}"`}
                        />
                    </List.Item>
                )}

            />

        )
    }
};


export default connect()(InviteList);