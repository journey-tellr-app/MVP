import React, { Component } from 'react'
import PropTypes from 'prop-types';


import { Button, Icon } from 'antd';

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

  render() {
    const { registration, handleInputChangeFor } = this.props;
    
    return (
      <form onSubmit={this.advanceRegistration}>
        <h2>Enter Profile Info</h2>
        <div>
          <label htmlFor="first_name">
            First Name:
              <input
              type="text"
              name="first_name"
              value={registration.first_name}
              onChange={handleInputChangeFor('first_name')}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="last_name">
            Last Name:
              <input
              type="text"
              name="last_name"
              value={registration.last_name}
              onChange={handleInputChangeFor('last_name')}
              required
            />
          </label>
        </div>
        <Button type='primary' htmlType='submit' > User Info <Icon type="right" /></Button>
      </form>
    )
  }
}

export default ProfileInfo;