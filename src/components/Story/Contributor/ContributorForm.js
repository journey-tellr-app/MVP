import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect', value);
}

class ContributorForm extends Component {
  state = {
    dataSource: [],
  }

  handleSearch = (value) => {
    if(value.length > 3){
      this.props.dispatch({
        type: 'GET_EMPLOYEES',
        payload: value,
      })
    }
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder="input here"
      />
    );
  }
}

export default connect()(ContributorForm);