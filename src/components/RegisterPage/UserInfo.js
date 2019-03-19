import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Icon, Input } from 'antd';

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

    //took out getFieldsError for now
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    // const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <h2>Enter User Info</h2>
        <Form layout='vertical' onSubmit={this.registerUser}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
            label="Email"
          >
            {getFieldDecorator('email', {
              rules: [{ type: 'email', message: 'The input is not valid email!', },
              { required: true, message: 'Please enter a valid email address eg user@site.com' }],
              initialValue: registration.email
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                onChange={handleInputChangeFor('email')}
                name='email' />
            )}
          </Form.Item>
        </Form>
        <form onSubmit={this.registerUser}>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            onChange={handleInputChangeFor('email')}
            name='email' 
            required/>
          <label htmlFor="confirm_email">
            Confirm Email:
              <input
              type="text"
              name="confirm_email"
              value={registration.confirm_email}
              onChange={handleInputChangeFor('confirm_email')}
              required
            />
          </label>
          <label htmlFor="password">
            Password:
              <input
              type="password"
              name="password"
              value={registration.password}
              onChange={handleInputChangeFor('password')}
              required
            />
          </label>
          <label htmlFor="confirm_password">
            Confirm Password:
              <input
              type="password"
              name="confirm_password"
              value={registration.confirm_password}
              onChange={handleInputChangeFor('confirm_password')}
              required
            />
          </label>
          <Button onClick={handleRegisterNavButton.bind(this, 'profile')}> Profile Info </Button>
          <Button onClick={this.registerUser} type="submit"> Register </Button>

        </form>
      </div>

    )
  }
}

export default connect()(UserInfo);