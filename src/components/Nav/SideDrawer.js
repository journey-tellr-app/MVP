import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NavigationLink from './NavigationLink';

import { Drawer, Typography, Divider } from 'antd';
import './Nav.css';
import 'antd/dist/antd.css';

// this drawer contains the main nav
// SideDrawer component is sourced in the Nav.js component

const { Title } = Typography;

class SideDrawer extends Component {
    //creates navLinks
    buildLinks = () => {
        const routes = [
            { route: '/home', name: 'Home', iconType: 'home' },
            { route: '/notification', name: 'Notifications', iconType: 'bell' },
            { route: '/choose-template', name: 'Begin Story', iconType: 'plus-square' },
            { route: '/search', name: 'Browse Stories', iconType: 'search' },
            { route: '/about', name: 'About', iconType: 'info-circle' },
            { route: '/', name: 'Log Out', iconType: 'logout' }];
        return routes.map((routeObj, i) => {
            return <NavigationLink routeObj={routeObj} notificationCount={this.props.invite.length} handleSideBar={this.props.handleSideBar} key={i} />
        })
    }

    render() {
        const { userInfo, visible, handleSideBar } = this.props;
        const logo = './images/kevinslogos/JourneyTellr-Logo_icononly_Color-version.png';
        //determines if placeholder pic needs to be used
        let profilePic = './images/placeholder.png';
        if (userInfo.profile_pic !== null) {
            profilePic = userInfo.profile_pic;
        }
        // console.log('in side drawer render');
        return (
            <Drawer
                width={300}
                placement="left"
                closable={true}
                onClose={handleSideBar.bind(this, false)}
                visible={visible}
            >
                <img src={logo} alt={'logo'} height="40" width="40" className="logo-icon-only" />
                <Divider />
                <Link to="/profile" onClick={handleSideBar.bind(this, false)} >
                    {/* Title contains current users profile picture and name */}
                    {/* When clicked on, the user will be taken to the Profile page */}
                    <Title level={4}>
                        <img src={profilePic} height="60" alt='placeholder' />
                        &nbsp;&nbsp;
                            {userInfo.first_name}&nbsp;{userInfo.last_name}
                    </Title>
                </Link>
                <Divider />
                {this.buildLinks()}
            </Drawer>
        );
    }
};


const mapStateToProps = store => ({
    userInfo: store.user.userInfo,
    invite: store.notification.invite,
});

export default connect(mapStateToProps)(SideDrawer);

