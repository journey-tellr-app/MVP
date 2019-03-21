import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import CreateStorySteps from './CreateStorySteps.js';

// ant design import
import { Form, Button } from 'antd';

class CreateStoryMain extends Component {

    componentDidMount() {
        this.props.form.validateFields();
    }

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    nextPage = (event) => {
        event.preventDefault();
        this.props.history.push('/choose-template/detail/');
    } // end createStory

    render() {

        const { template } = this.props;

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form layout="vertical" onSubmit={this.nextPage}>
                <h2>Create a Story</h2>
                <CreateStorySteps current={0} />
                <Form.Item
                    label="Create a story or choose a template"
                >
                    <ChooseTemplate />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                            htmlType="submit"
                            disabled={template.name === ''}
                    >
                        Next
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}

const WrappedCreateStoryMain = Form.create()(CreateStoryMain);

const mapStoreToProps = reduxStore => ({
    template: reduxStore.template.templateNewStoryReducer,
});

export default connect(mapStoreToProps)(WrappedCreateStoryMain);