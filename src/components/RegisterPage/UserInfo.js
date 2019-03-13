import React, { Component } from 'react'

import { Button, Icon, Form, Input } from 'antd';

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UserInfo extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  registerUser = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
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

    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
        <h2>Enter User Info</h2>
        <Form layout='vertical' onSubmit={this.registerUser}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
        </Form>
        <form onSubmit={this.registerUser}>
          <label htmlFor="email">
            Email:
              <input
              type="text"
              name="email"
              value={registration.email}
              onChange={handleInputChangeFor('email')}
            />
          </label>
          <label htmlFor="confirm_email">
            Confirm Email:
              <input
              type="text"
              name="confirm_email"
              value={registration.confirm_email}
              onChange={handleInputChangeFor('confirm_email')}
            />
          </label>
          <label htmlFor="password">
            Password:
              <input
              type="password"
              name="password"
              value={registration.password}
              onChange={handleInputChangeFor('password')}
            />
          </label>
          <label htmlFor="confirm_password">
            Confirm Password:
              <input
              type="password"
              name="confirm_password"
              value={registration.confirm_password}
              onChange={handleInputChangeFor('confirm_password')}
            />
          </label>
          <Button onClick={handleRegisterNavButton.bind(this, 'profile')}> Profile Info </Button>
          <Button type="submit"> Register </Button>
        </form>
      </div>

    )
  }
}

export default Form.create()(UserInfo);