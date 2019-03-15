import React, { Component } from 'react'

import { Button, Form} from 'antd';

class ProfileInfo extends Component {
  render() {
    const { registration, handleInputChangeFor, handleRegisterNavButton } = this.props;

    return (
      <form onSubmit={this.registerUser}>
        <div>
          <label htmlFor="first_name">
            First Name:
              <input
              type="text"
              name="first_name"
              value={registration.first_name}
              onChange={handleInputChangeFor('first_name')}
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
            />
          </label>
        </div>
        <Button onClick={handleRegisterNavButton.bind(this, 'user')}> User Info </Button>
      </form>
    )
  }
}

export default Form.create()(ProfileInfo);