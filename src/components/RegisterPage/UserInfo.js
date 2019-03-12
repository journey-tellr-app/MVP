import React, { Component } from 'react'

export default class UserInfo extends Component {
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
    const { registration, handleInputChangeFor } = this.props;

    return (
      <form onSubmit={this.registerUser}>
        <div>
          <label htmlFor="email">
            Email:
              <input
              type="text"
              name="email"
              value={registration.email}
              onChange={handleInputChangeFor('email')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="confirm_email">
            Confirm Email:
              <input
              type="text"
              name="confirm_email"
              value={registration.confirm_email}
              onChange={handleInputChangeFor('confirm_email')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
              <input
              type="password"
              name="password"
              value={registration.password}
              onChange={handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="confirm_password">
            Confirm Password:
              <input
              type="password"
              name="confirm_password"
              value={registration.confirm_password}
              onChange={handleInputChangeFor('confirm_password')}
            />
          </label>
        </div>
        <div>
          <input
            className="register"
            type="submit"
            name="submit"
            value="Register"
          />
        </div>
      </form>
    )
  }
}
