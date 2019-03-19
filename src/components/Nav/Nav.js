import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './JourneyTellr-Nameonly-color-noR.png';
import SideDrawer from './SideDrawer';

import { Row, Col } from 'antd';
import './Nav.css';

const Nav = () => (
  <div className="nav">
    <Row type="flex" justify="center" align='middle'>
      <Col span={3}>
        <SideDrawer />
      </Col>
      <Col span={18}>
        <Link to="/home">
          <img src={logo}
            alt={'logo'}
            className="logo" />
        </Link>
      </Col>
      <Col span={3} />
    </Row>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:


export default connect()(Nav);
