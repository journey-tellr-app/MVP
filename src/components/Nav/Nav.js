import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SideDrawer from './SideDrawer';
import AboutLink from './AboutLink';

import { Row, Col } from 'antd';
import './Nav.css';

class Nav extends React.Component {

  render() {
    // console.log(this.props);
    let journeyTellrLogo = './images/kevinslogos/JourneyTellr-Nameonly-color-noR.png'
    return (
      <div className="nav">
        <Row type="flex" justify="center" align='middle'>
          <Col span={3}>
            {this.props.user.id !== undefined ?
              <SideDrawer />
              :
              <AboutLink />
            }
          </Col>
          <Col span={18}>
            <Link to="/home">
              <img src={journeyTellrLogo}
                alt={'logo'}
                className="logo" />
            </Link>
          </Col>
          <Col span={3} />
        </Row>
      </div>
    )
  }
};

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
const mapRStoProps = (rs) => {
  return { user: rs.user.userInfo }
}

export default connect(mapRStoProps)(Nav);
