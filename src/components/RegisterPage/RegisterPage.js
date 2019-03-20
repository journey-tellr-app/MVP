import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { Button, Icon } from 'antd';

import ProfileInfo from './ProfileInfo';
import UserInfo from './UserInfo';
import ErrorNotification from '../Common/ErrorNotification';

import { notification } from 'antd';

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

  handleRegisterNavButton = (page, e) => {
    this.setState({ page: page })
  }

  showRegistrationErrorMessage = () => {
    notification.open({})
  }

  render() {
    const { registration } = this.props;

    return (
      <div>
        {ErrorNotification()}
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
          <ProfileInfo registration={registration}
            handleInputChangeFor={this.handleInputChangeFor}
            handleRegisterNavButton={this.handleRegisterNavButton} />
        }

        {this.state.page === 'user' &&
          <UserInfo registration={registration}
            handleInputChangeFor={this.handleInputChangeFor}
            handleRegisterNavButton={this.handleRegisterNavButton} />
        }

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

