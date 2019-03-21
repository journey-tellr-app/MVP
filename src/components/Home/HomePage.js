import React, { Component } from 'react';
import { connect } from 'react-redux';
//Ant design
import { Divider, Button, notification } from 'antd';

import ContributedList from './ContributedList';
import TopStoryList from './TopStoryList';

class HomePage extends Component {

    componentDidMount() {
        if (this.props.invite.length > 0) {
            notification.open({
                message: 'Notification Title',
                description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }
    };


    render() {
        return (
            <div>
                <br />
                <h1 align='center'>Home</h1>
                <Divider>My Stories and Contributions</Divider>
                <ContributedList
                    history={this.props.history}
                />
                <Divider>Top Stories at Prime</Divider>
                <TopStoryList
                    history={this.props.history}
                />
            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    invite: reduxStore.notification.invite,
});

export default connect(mapStateToProps)(HomePage);