import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContributorPopup from '../Contributor/ContributorPopup.js';
import ContributorList from '../Contributor/ContributorList.js';
import CreateStorySteps from './../CreateStory/CreateStorySteps.js'

// ant design import
import { Form, Input, Button } from 'antd';

class CreateStoryContributor extends Component {

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    createStory = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                // send data to the saga
                this.props.dispatch({ type: 'POST_NEW_STORY' });
                // clear the fields
                this.props.form.resetFields();
                // go to home page
                this.props.history.push('/home');
            }
        });
    } // end createStory

    render() {

        const { contributor } = this.props;

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
            <Form layout="vertical" onSubmit={this.createStory}>
                <h2>Add Contributors</h2>
                <CreateStorySteps current="3" />
                <Form.Item
                    label="Add contributors"
                >
                    <ContributorPopup />
                </Form.Item>
                {contributor.length !== 0 ? <ContributorList /> : ''}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                            htmlType="submit"
                    >
                        Create Story
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}

const WrappedCreateStoryContributor = Form.create()(CreateStoryContributor);

const mapStoreToProps = reduxStore => ({
    contributor: reduxStore.contributor.pending,
});

export default connect(mapStoreToProps)(WrappedCreateStoryContributor);