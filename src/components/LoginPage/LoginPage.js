import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubHeader from '../Common/SubHeader';

import { Input, Icon, Row, Col, Button, notification } from 'antd';
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

  showLoginErrorMessage = () => {
    notification.open({
      key: 'loginMessage',
      message: 'An Error Occurred When Logging In',
      description: this.props.errors.loginMessage,
      duration: 4,
    });
    this.props.dispatch({ type: 'CLEAR_LOGIN_ERROR' });
  };

  render() {
    const { email, password } = this.state;
    const { handleInputChangeFor } = this;
    const suffix = email ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div>
        {this.props.errors.loginMessage &&
          this.showLoginErrorMessage()
        }
        <Row type='flex' align='middle' justify='center'>
          <Col span={24}>
            <SubHeader headerText='Log In' />
          </Col>

          <Col span={20}>
            <form onSubmit={this.login} className="login-form">
              <Row type="flex" justify="center">
                <Col span={18} style={{ margin: '10px 0px' }}>
                  <label htmlFor="email">
                    Email:
                    <Input
                      placeholder="Enter your email address"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      suffix={suffix}
                      value={email}
                      id='email'
                      onChange={handleInputChangeFor} />
                  </label>
                </Col>
                <Col span={18} style={{ marginBottom: '10px' }}>
                  <label htmlFor="password">
                    Password:
                    <Input
                      placeholder='Enter your password'
                      prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      value={password}
                      id='password'
                      onChange={handleInputChangeFor} />
                  </label>
                </Col>
                <Col span={18} style={{ marginBottom: '10px' }}>
                  <Button
                    type="primary"
                    htmlType='submit'
                    style={{ width: '100%' }}>
                    Log In</Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        
        <Row>
          <Col style={{
            margin: '20px',
            float: 'right',}}>
            <Button
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
              Register</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
