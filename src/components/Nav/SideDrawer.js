import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../Common/LogOutButton';
import { Drawer } from 'antd';
import { Typography } from 'antd';
import { Divider } from 'antd';
import './Nav.css';
import 'antd/dist/antd.css';

// icons used on this component
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';


import logo from './JourneyTellr-Logo_icononly_Color-version.png';


// adds fa icons to project icon library
library.add(faBars)
library.add(faPlusSquare)
library.add(faBell)
library.add(faUsers)
library.add(faBook)
library.add(faHome)
library.add(faSignInAlt)

// with Ant Design, the specific type of typography component used needs to be declares as a constant
const { Text } = Typography;
const { Title } = Typography;

// this drawer contains the main nav
// SideDrawer component is sourced in the Nav.js component
class SideDrawer extends Component {
    state = { visible: false };

    componentDidMount() {
        this.props.dispatch({ type: "FETCH_USER" });
    }

    // this causes the nav drawer to appear when called
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    // this causes the nav drawer to close when called
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { userInfo } = this.props;

        return (
            <div>

                <FontAwesomeIcon
                    className="drawer-btn"
                    icon="bars"
                    size="3x"
                    onClick={this.showDrawer}
                />

                <Drawer
                    width={300}
                    placement="left"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <img src={logo} alt={'logo'} height="40" width="40" className="logo-icon-only" />
                    <Divider />
                    <Link to="/profile" onClick={this.onClose}>
                        {/* Title contains current users profile picture and name */}
                        {/* When clicked on, the user will be taken to the Profile page */}
                        <Title level={4}>
                            <img src={userInfo.profile_pic} height="60" />
                            &nbsp;&nbsp;
                            {userInfo.first_name}&nbsp;{userInfo.last_name}
                        </Title>
                    </Link>
                    <Divider />
                    <Link to="/choose-template" onClick={this.onClose}>
                        <Text><FontAwesomeIcon icon="plus-square" /> &nbsp; Create New Story</Text>
                    </Link>
                    <Divider />
                    <Link to="/notification" onClick={this.onClose}>
                        <Text><FontAwesomeIcon icon="bell" /> &nbsp; Notifications</Text>
                    </Link>
                    <Divider />
                    <Link to="/search" onClick={this.onClose}>
                        <Text><FontAwesomeIcon icon="book" /> &nbsp; All Stories</Text>
                    </Link>
                    <Divider />
                    {/* this Link will show Home if user is logged in, and will show Login if not logged in */}
                    <Link to="/home" onClick={this.onClose}>
                        <FontAwesomeIcon icon="home" /> {userInfo.id ? 'Home' : 'Login'}
                    </Link>
                    <Divider />
                    <Link to="/about" onClick={this.onClose}>
                        <Text>About</Text>
                    </Link>
                    <Divider />
                    {userInfo.id && (
                        <LogOutButton />
                    )}
                </Drawer>
            </div >
        );
    }
};


const mapStateToProps = store => ({
    userInfo: store.user.userInfo
});

export default connect(mapStateToProps)(SideDrawer);

