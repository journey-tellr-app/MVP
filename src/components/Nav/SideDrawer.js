import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// icons used on this component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPlusSquare, faBell, faUsers, faBook, faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { Drawer, Typography, Divider, Icon } from 'antd';
import './Nav.css';
import 'antd/dist/antd.css';

// adds fa icons to project icon library
library.add(faBars)
library.add(faPlusSquare)
library.add(faBell)
library.add(faUsers)
library.add(faBook)
library.add(faHome)
library.add(faSignInAlt)

// this drawer contains the main nav
// SideDrawer component is sourced in the Nav.js component

const { Text, Title } = Typography;

class SideDrawer extends Component {
    state = {
        visible: false,
        // possible use in building nav links
        routes: [
            { route: '/home', name: 'Home', iconType: 'home' },
            { route: '/notification', name: 'Notifications', iconType: 'bell' },
            { route: '/choose-template', name: 'Begin Story', iconType: 'plus-square' },
            { route: '/search', name: 'Browse Stories', iconType: 'search' },
            { route: '/about', name: 'About', iconType: 'info-circle' },
            { route: '/', name: 'Log Out', iconType: 'logout'}]
    };

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

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

    getClass = (link) => {
        const className = ['nav-link-div'];
        if (link === this.props.location.pathname) {
            className.push('nav-location');
        }

        return className.join(' ');
    }

    buildLinks = () => {
        return this.state.routes.map( (routeObj, i ) => {
            const { route, name, iconType } = routeObj;
            let onCloseFxn = this.onClose;
            if(name === 'Log Out'){
                onCloseFxn = () => this.props.dispatch({ type: 'LOGOUT' })
            }
            return (
                <Link to={route} onClick={onCloseFxn} key={i}>
                    <div className={this.getClass(route)}>
                        <Text><Icon type={iconType} /> &nbsp; {name}</Text>
                    </div>
                </Link>
            )
        })
    }

    render() {
        const { userInfo } = this.props;
        const logo = './images/kevinslogos/JourneyTellr-Logo_icononly_Color-version.png';
        // with Ant Design, the specific type of typography component used needs to be declares as a constant
        let profilePic = './images/placeholder.png';
        if (userInfo.profile_pic !== null) {
            profilePic = userInfo.profile_pic;
        }
        // console.log(this.props);
        return (
            <div className='header-button-div'>
                <FontAwesomeIcon
                    className="drawer-btn"
                    icon="bars"
                    size="2x"
                    onClick={this.showDrawer}
                    visible={toString(this.state.visible)}
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
                    <Link to="/profile" onClick={this.onClose} >
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
            </div >
        );
    }
};


const mapStateToProps = store => ({
    userInfo: store.user.userInfo
});

const SideDrawerWithRouter = withRouter(SideDrawer);

export default connect(mapStateToProps)(SideDrawerWithRouter);

