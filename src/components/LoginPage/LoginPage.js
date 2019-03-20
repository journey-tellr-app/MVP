import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubHeader from '../Common/SubHeader';

import { Input, Icon, Row, Col, Button } from 'antd';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ email: '' });
  }

  render() {
    const suffix = email ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const { email, password } = this.state;
    const { handleInputChangeFor } = this;
    return (
      <div>
        <SubHeader headerText='Log In' />
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} className="login-form">
          <label htmlFor="email">
            Email:
              <Input
              placeholder="Enter your email address"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffix}
              value={email}
              id='email'
              onChange={handleInputChangeFor}
            />
          </label>

          <label htmlFor="password">
            Password:
              <Input
              placeholder='Enter you password'
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              value={password}
              id='password'
              onChange={handleInputChangeFor}
            />
          </label>

          <Button
            type="primary"
            htmlType='submit'>
            Log In
          </Button>
        </form>

        <center>
          <Button
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
            Register
          </Button>
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

export default connect(mapStateToProps)(LoginPage);
