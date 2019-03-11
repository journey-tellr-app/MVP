import React, { Component } from 'react';
import {connect} from 'react-redux';

class RegisterPage extends Component {
  state = {   
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_email: '',
    confirm_password: ''
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.first_name && this.state.last_name && (this.state.email === this.state.confirm_email) && (this.state.password === this.state.confirm_password)) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="first_name">
              First Name:
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="confirm_email">
              Confirm Email:
              <input
                type="text"
                name="confirm_email"
                value={this.state.confirm_email}
                onChange={this.handleInputChangeFor('confirm_email')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="confirm_password">
               Confirm Password:
              <input
                type="password"
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.handleInputChangeFor('confirm_password')}
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
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

