import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notification extends Component {
    render() {
        return (
            <div>
                <h1>Notifications</h1>
            </div>
        )
    }
};

export default connect()(Notification);