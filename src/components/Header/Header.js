import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavButton from '../Nav/NavButton.js';

import { Icon, Row, Col } from 'antd';
import '../Nav/Nav.css';

class Header extends React.Component {

    render() {
        let journeyTellrLogo = './images/kevinslogos/JourneyTellr-Nameonly-color-noR.png'
        return (
            <Row type="flex" justify="center" align='middle' className='nav'>
                <Col span={3}>
                    {this.props.user.id !== undefined ?
                        <NavButton />
                        :
                        <div className='header-button-div'>
                            <Link to="/about" >
                                <Icon type='info-circle' theme='twoTone' twoToneColor='#D98A4F' style={{ fontSize: '24px' }} />
                            </Link>
                        </div>
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

export default withRouter(connect(mapRStoProps)(Header));
