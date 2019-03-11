import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Button } from 'antd';
import './Nav.css';
import 'antd/dist/antd.css';


class SideDrawer extends Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    Drawer
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div >
        );
    }
}


export default connect()(SideDrawer);

