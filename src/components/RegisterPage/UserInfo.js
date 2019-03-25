import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Icon, Input, Row, Col } from 'antd';
import './RegisterPage.css';

class UserInfo extends Component {
  static propTypes = {
    registration: PropTypes.object.isRequired,
    handleInputChangeFor: PropTypes.func.isRequired,
    handleRegisterNavButton: PropTypes.func.isRequired,
  }

  registerUser = (event) => {
    event.preventDefault();
    const { first_name, last_name, email, password,
      profile_pic, confirm_email, confirm_password } = this.props.registration;

    if (first_name && last_name && (email === confirm_email) && (password === confirm_password)) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          profile_pic: profile_pic
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  dummy = () => {
    let dummyProfile = { type: 'UPDATE_REGISTRATION', payload: {  email: 'mattkleven@gmail.com',
                                                                  confirm_email: 'mattkleven@gmail.com',
                                                                  password: 'a',
                                                                  confirm_password: 'a',
                                                                  profile_pic: 'https://journey-tellr-images.s3.amazonaws.com/bucketFolder/1553549316156-lg.jpg', }}
    this.props.dispatch(dummyProfile);
  }

  render() {
    const { registration,
      handleInputChangeFor,
      handleRegisterNavButton, } = this.props;

    return (
      <form onSubmit={this.registerUser}>
        <Row type="flex" justify="space-around" >
          <Col span={18} style={{ margin: '10px 0px' }}>
            <h3>Please enter your log in information.</h3>
          </Col>
          <Col span={18} style={{ marginBottom: '10px' }}>
            <label htmlFor="email">
              <Input
                placeholder="yourname@email.com"
                onChange={handleInputChangeFor}
                name='email'
                value={registration.email}
                required />
            </label>
          </Col>

          <Col span={18} style={{ marginBottom: '10px' }}>
            <label htmlFor="confirm_email">
              Confirm Email:
            <Input
                placeholder="yourname@email.com"
                type="email"
                name="confirm_email"
                value={registration.confirm_email}
                onChange={handleInputChangeFor}
                required />
            </label>
          </Col>

          <Col span={18} style={{ marginBottom: '10px' }}>
            <label htmlFor="password">
              Password:
              <Input
                placeholder="Enter your password"
                type="password"
                name="password"
                value={registration.password}
                onChange={handleInputChangeFor}
                required />
            </label>
          </Col>

          <Col span={18} style={{ marginBottom: '10px' }}>
            <label htmlFor="confirm_password">
              Confirm Password:
              <Input
                placeholder="Re-enter your password"
                type="password"
                name="confirm_password"
                value={registration.confirm_password}
                onChange={handleInputChangeFor}
                required
              />
            </label>
          </Col>

          <Col span={8}>
            <Button
              onClick={handleRegisterNavButton.bind(this, 'profile')}
              className='registration-button'>
              <Icon type='left' />
              Back
            </Button>
          </Col>
          <Col span={2}>
          <Button
              onClick={this.dummy}
              style={{opacity: 0,}}>
              Dummy
            </Button>
          </Col>
          <Col span={8}>
            <Button onClick={this.registerUser}
              type="primary"
              htmlType='submit'
              className='registration-button'>
              Register </Button>
          </Col>
        </Row>


      </form>

    )
  }
}

export default connect()(UserInfo);