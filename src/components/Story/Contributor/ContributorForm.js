import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';

import { Button } from 'antd';

const Option = AutoComplete.Option;

class ContributorForm extends Component {
  state = {
    person: {},
  }

  handleSearch = (value) => {
    if (value.length > 3) {
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
    this.props.dispatch({
      type: 'ADD_PENDING_CONTRIBUTORS',
      payload: this.state.person
    })
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
        <AutoComplete
          style={{ width: 200 }}
          onSearch={this.handleSearch}
          onChange={this.onChange}
          placeholder="input here">
          {this.props.employeeResults &&
            searchResults
          }
        </AutoComplete>
        <Button icon="user-add" onClick={this.handleClick} />
      </div>

    );
  }
}

const mapRStoProps = (rs) => {
  return { employeeResults: rs.contributor.employeeResults }
}

export default connect(mapRStoProps)(ContributorForm);