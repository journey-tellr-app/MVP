import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Button, Icon } from 'antd';

import ProfileInfo from './ProfileInfo';
import UserInfo from './UserInfo';

class RegisterPage extends Component {
  state = {
    page: 'profile',
  }

  handleInputChangeFor = propertyName => (event) => {
    this.props.dispatch({
      type: 'UPDATE_REGISTRATION',
      payload: {
        [propertyName]: event.target.value,
      }
    });
  }

  handleRegisterButton = (page, e) => {
    this.setState({ page: page })
  }

  render() {
    const { registration } = this.props;

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
        <h1>New User Registration</h1>
        {this.state.page === 'profile' &&
          <ProfileInfo registration={registration} handleInputChangeFor={this.handleInputChangeFor} />
        }
        {this.state.page === 'user' &&
          <UserInfo registration={registration} handleInputChangeFor={this.handleInputChangeFor} />
        }

        <Button onClick={this.handleRegisterButton.bind(this, 'profile')}> Profile Info </Button>
        <Button onClick={this.handleRegisterButton.bind(this, 'user')}> User Info </Button>

        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Return to Login
          </button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  registration: state.user.registration,
});

export default connect(mapStateToProps)(RegisterPage);

