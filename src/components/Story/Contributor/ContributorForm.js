import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';

import { Alert, Input, Icon } from 'antd';

const Option = AutoComplete.Option;

class ContributorForm extends Component {
  state = {
    person: {},
    alert: false,
  }

  handleSearch = (value) => {
    if (value.length > 1) {
      this.props.dispatch({
        type: 'GET_EMPLOYEES',
        payload: value,
      })
    }
  }

  onChange = (value) => {
    this.setState({
      person: this.props.employeeResults[value]
    })
  }

  handleClick = () => {
    const repeat = this.props.pendingContributors.filter((c) => { return c.person_id === this.state.person.person_id });
    if (this.state.person.first_name === undefined) {
      return null;
    } else if (repeat.length > 0) {
      this.setState({ alert: true, });
      setTimeout(() => { this.setState({ alert: false, }) }, 2000);
    } else {
      this.props.dispatch({
        type: 'ADD_PENDING_CONTRIBUTORS',
        payload: this.state.person
      })
      this.props.dispatch({ type: 'CLEAR_EMPLOYEE_RESULTS' })
    }
  }

  render() {
    const searchResults = this.props.employeeResults.map(
      (employeeObj, i) => {
        return (
          <Option key={i} >
            {`${employeeObj.first_name} ${employeeObj.last_name}`}
          </Option>);
      });
    return (
      <div>
        {this.state.alert ?
          <div>
            <Alert message={
              `User is already a contributor`}
              type="warning"
              showIcon />
          </div>
          :
          null
        }
        <AutoComplete
          style={{ width: "100%" }}
          onSearch={this.handleSearch}
          onChange={this.onChange}
          defaultValue=''
          placeholder="begin typing name"
          dataSource={searchResults}>
          <Input
            addonAfter={(
              <Icon type="user-add" onClick={this.handleClick} />
            )}
          />
        </AutoComplete>
      </div>
    );
  }
}

const mapRStoProps = (rs) => {
  return {
    employeeResults: rs.contributor.employeeResults,
    pendingContributors: rs.contributor.pending
  }
}

export default connect(mapRStoProps)(ContributorForm);