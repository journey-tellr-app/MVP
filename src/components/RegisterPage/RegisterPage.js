import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { Button, Icon } from 'antd';

import ProfileInfo from './ProfileInfo';
import UserInfo from './UserInfo';
import SubHeader from '../Common/SubHeader';

import { notification, Row, Col, Button } from 'antd';

class RegisterPage extends Component {
  state = {
    page: 'profile',
  }

  handleInputChangeFor = (event) => {
    this.props.dispatch({
      type: 'UPDATE_REGISTRATION',
      payload: {
        [event.target.name]: event.target.value,
      }
    });
  }

  handleRegisterNavButton = (page, e) => {
    this.setState({ page: page })
  }

  showRegisterErrorMessage = () => {
    notification.open({
      key: 'registerMessage',
      message: 'Error with Registration',
      description: this.props.errors.registrationMessage,
      duration: 4,
    });
    this.props.dispatch({ type: 'CLEAR_REGISTRATION_ERROR' });
  }

  render() {
    const { registration } = this.props;

    return (
      <div>
        {this.props.errors.registrationMessage &&
          this.showRegisterErrorMessage()
        }
        <Row>
          <Col>
            <SubHeader headerText='New User Registration' />
          </Col>

          {this.state.page === 'profile' &&
            <Col>
              <ProfileInfo registration={registration}
                handleInputChangeFor={this.handleInputChangeFor}
                handleRegisterNavButton={this.handleRegisterNavButton} />
            </Col>
          }

          {this.state.page === 'user' &&
            <Col>
              <UserInfo registration={registration}
                handleInputChangeFor={this.handleInputChangeFor}
                handleRegisterNavButton={this.handleRegisterNavButton} />
            </Col>
          }
          <Col style={{
            margin: '20px',
            float: 'left',
          }}>
            <Button
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}>
              Return to Login
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  registration: state.user.registration,
});

export default connect(mapStateToProps)(RegisterPage);

