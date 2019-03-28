import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Select, Form } from 'antd';

class ChooseTemplate extends Component {

    // load templates for the dropdown menu
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TEMPLATE_STORY' });
    }

    // gets template details from the database and sets the reducer
    handleChange = (value) => {
        if (value === 'initial') {
            this.props.dispatch({ type: 'SET_TEMPLATE_NEW_CREATE' })
        } else {
            this.props.dispatch({ type: 'GET_TEMPLATE_DETAILS', payload: value });
        }
    }

    render() {
        return (
            <Form.Item
                label="Create a story or choose a template">
                <Select
                    defaultValue="Please select"
                    style={{ width: '100%' }}
                    id='storyType'
                    onChange={this.handleChange}>
                    <Select.Option value="initial">Create a new Story</Select.Option>
                    {this.props.template.map((item, i) => (<Select.Option key={i} value={item.id}>{item.name}</Select.Option>))}
                </Select>
            </Form.Item >
        )
    }
};

const mapStoreToProps = reduxStore => ({
    template: reduxStore.template.templateReducer,
});

export default connect(mapStoreToProps)(ChooseTemplate);