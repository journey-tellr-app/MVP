import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../Common/LogOutButton';
import SideDrawer from './SideDrawer';
import logo from './JourneyTellr-Nameonly-color-noR.png';
import './Nav.css';


const Nav = () => (
  <div className="nav">
    <div>
      <SideDrawer />
    </div>
    <Link to="/home">
      <img src={logo} alt={'logo'} height="40" width="150" className="logo" />
    </Link>
    <Link to='/existing-story'>
      existing story
    </Link>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:


export default connect()(Nav);
