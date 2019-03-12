import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Select } from 'antd';

class ChooseTemplate extends Component {

    // gets template details from the database and sets the reducer
    handleChange = (value) => {
        // send the value(id) to get selected template
        if(value === 'initial'){
            this.props.dispatch({ type: 'RESET_TEMPLATE_NEW_STORY' });
            this.props.dispatch({ type: 'RESET_TEMPLATE_NEW_CHAPTER' });
        } else {
            this.props.dispatch({ type: 'GET_TEMPLATE_DETAILS', payload: value});
        }
    }

    render() {
        return (
            <div>
                <Select defaultValue="Please select" style={{ width: 340 }} onChange={this.handleChange}>
                    <Select.Option value="initial">Create a new Story</Select.Option>
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