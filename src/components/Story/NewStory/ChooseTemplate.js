import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';

class ChooseTemplate extends Component {

    // will set the value for the dropdown. Not currently doing that, only console loggging
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render() {
        return (
            <div>
                <Select defaultValue="Please select" style={{ width: 340 }} onChange={this.handleChange}>
                    {this.props.template.map((item, i) => ( <Select.Option key={i} value={item.id}>{item.name}</Select.Option> ))}
                </Select>
            </div>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    template: reduxStore.template,
});

export default connect(mapStoreToProps)(ChooseTemplate);