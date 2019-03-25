import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImageUpload from '../ImageUpload/ImageUpload';

import { Button, Icon, Row, Col, Input } from 'antd';
import './RegisterPage.css';

class ProfileInfo extends Component {
  static propTypes = {
    registration: PropTypes.object.isRequired,
    handleInputChangeFor: PropTypes.func.isRequired,
    handleRegisterNavButton: PropTypes.func.isRequired,
  }

  advanceRegistration = (e) => {
    e.preventDefault();
    this.props.handleRegisterNavButton('user');
  }

  dummy = () => {
    let dummyProfile = { type: 'UPDATE_REGISTRATION', payload: {  first_name: 'Matt', last_name: 'Kleven',}}
    this.props.dispatch(dummyProfile);
  }

  render() {
    const { registration, handleInputChangeFor } = this.props;

    return (
      <form onSubmit={this.advanceRegistration}>
        <Row type="flex" justify="center">
          <Col span={18} style={{ margin: '10px 0px' }}>
            <h3>Please enter your public profile info.</h3>
          </Col>
          <Col span={18} style={{ marginBottom: '10px' }}>
            <label htmlFor="first_name">
              First Name:
              <Input
                placeholder='Enter your first name'
                type="text"
                name="first_name"
                value={registration.first_name}
                onChange={handleInputChangeFor}
                required />
            </label>
          </Col>
          <Col span={18} style={{ marginBottom: '10px' }}>
            <label htmlFor="last_name">
              Last Name:
              <Input
                placeholder='Enter your last name'
                type="text"
                name="last_name"
                value={registration.last_name}
                onChange={handleInputChangeFor}
                required />
            </label>
          </Col>

          <Col span={18} style={{ marginBottom: '10px' }} >
            <ImageUpload photoDetails={{ typeOfPhoto: 'REGISTER', title: 'Choosing New Profile Photo', buttonName: 'Add Profile Photo' }} />
          </Col>


          <Col span={12}>
          <Button
              className='registration-button'
              onClick={this.dummy}
              style={{opacity: 0,}}>
              Dummy
              <Icon type="right" />
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type='primary'
              htmlType='submit'
              className='registration-button'>
              Next
              <Icon type="right" />
            </Button>
          </Col>
        </Row>


      </form>
    )
  }
}

export default connect()(ProfileInfo);