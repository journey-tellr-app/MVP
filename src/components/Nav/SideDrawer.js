import React, { Component } from 'react';
import { connect } from 'react-redux';

class SideDrawer extends Component {
    render() {
        return (
            <div>
                <h1>Side Drawer</h1>
            </div>
        )
    }
};

export default connect()(SideDrawer);