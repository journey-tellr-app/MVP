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
    const { registration } = this.props;

    if (registration.first_name && registration.last_name && (registration.email === registration.confirm_email) && (registration.password === registration.confirm_password)) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          first_name: registration.first_name,
          last_name: registration.last_name,
          email: registration.email,
          password: registration.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

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
                required />
            </label>
          </Col>

          <Col span={18} style={{ marginBottom: '10px' }}>
            <label htmlFor="confirm_email">
              Confirm Email:
            <Input
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
                type="password"
                name="confirm_password"
                value={registration.confirm_password}
                onChange={handleInputChangeFor}
                required
              />
            </label>
          </Col>

          <Col span={10}>
            <Button
              onClick={handleRegisterNavButton.bind(this, 'profile')}
              className='registration-button'>
              <Icon type='left' />
              Back
            </Button>
          </Col>
          <Col span={10}>
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