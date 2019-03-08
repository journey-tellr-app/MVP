import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotificationList extends Component {
    render() {
        return (
            <div>
                <h1>Notification List</h1>
            </div>
        )
    }
};

export default connect()(NotificationList);