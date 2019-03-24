import React, { Component } from 'react';
import { connect } from 'react-redux';
//Ant design
import { Divider, notification } from 'antd';

import ContributedList from './ContributedList';
import TopStoryList from './TopStoryList';
import SubHeader from '../Common/SubHeader';

import './CardDesigns.css';

class HomePage extends Component {
    componentDidMount() {
        if (this.props.invite.length > 0) {
            notification.open({
                message: `Welcome, ${this.props.user.first_name}`,
                description: `You have ${this.props.invite.length} notifications`,
                duration: 0,
                onClick: () => {
                    // console.log('Notification Clicked!');
                    this.props.history.push('/notification');
                },
            });
        }
    };

    render() {
        return (
            <div align="center">
            <SubHeader headerText='Home'/>
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
    user: reduxStore.user.userInfo,
});

export default connect(mapStateToProps)(HomePage);