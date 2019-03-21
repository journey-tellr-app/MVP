import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContributorForm from '../Contributor/ContributorForm.js';
import ContributorList from '../Contributor/ContributorList.js';
import CreateStorySteps from './../CreateStory/CreateStorySteps.js'

// ant design import
import { Form, Button } from 'antd';

class CreateStoryContributor extends Component {

    // go back to the previous page
    previousButton = () => {
        this.props.history.push('/choose-template/chapter/');
    }

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    createStory = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                // package story, chapter, and contributor reducers and send to saga
                // seperate files for story, chapter and contributor data sent to the redux saga
                let storyDataToSend = this.props.story;
                let chapterDataToSend = this.props.chapter;
                let contributorDataToSend = this.props.contributor;

                // bundle the story, chapter and contributon files together and create a payload
                let completeDataToSend = { story: storyDataToSend, chapter: chapterDataToSend, contributor: contributorDataToSend };

                // send data to the saga
                this.props.dispatch({ type: 'POST_NEW_STORY',  payload: completeDataToSend });
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
                    <ContributorForm />
                </Form.Item>
                {contributor.length !== 0 ? <ContributorList /> : ''}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                            htmlType="submit"
                            disabled={this.props.story.title === ''}
                    >
                        Create Story
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.previousButton}>
                        Previous
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}

const WrappedCreateStoryContributor = Form.create()(CreateStoryContributor);

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
    contributor: reduxStore.contributor.pending,
});

export default connect(mapStoreToProps)(WrappedCreateStoryContributor);