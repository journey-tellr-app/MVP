import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';

class ChooseTemplate extends Component {

    // will set the value for the dropdown. Not currently doing that, only console loggging
    handleChange = (value) => {
        // send the value(id) to get selected template
        if(value === 'initial'){
            this.props.dispatch({ type: 'RESET_TEMPLATE_DETAILS' });
        } else {
            this.props.dispatch({ type: 'GET_TEMPLATE_DETAILS', payload: value});
        }
    }

    render() {
        return (
            <div>
                <Select defaultValue="Please select" style={{ width: 340 }} onChange={this.handleChange}>
                    <Select.Option value="initial">Add New Story</Select.Option>
                    {this.props.template.map((item, i) => ( <Select.Option key={i} value={item.id}>{item.name}</Select.Option> ))}
                </Select>
            </div>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    template: reduxStore.template.templateReducer,
});

export default connect(mapStoreToProps)(ChooseTemplate);