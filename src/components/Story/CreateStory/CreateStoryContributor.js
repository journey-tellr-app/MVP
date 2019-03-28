import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorForm from '../Contributor/ContributorForm.js';
import ContributorList from '../Contributor/ContributorList.js';
import CreateStorySteps from './../CreateStory/CreateStorySteps.js';
import SubHeader from '../../Common/SubHeader';

// ant design import
import { Form, Button, Row, Col, Typography, Icon } from 'antd';

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
                this.props.dispatch({ type: 'POST_NEW_STORY', payload: completeDataToSend });
                // clear the fields
                this.props.form.resetFields();
                // go to home page
                this.props.history.push('/home');
            }
        });
    } // end createStory

    render() {
        const { contributor } = this.props;

        return (
            <div>
                <Row type='flex' align='middle' justify='center'>
                    <Col span={24}>
                        <SubHeader headerText='Add Contributors' />
                    </Col>
                    <Col span={18}>
                        <CreateStorySteps current={3} />
                    </Col>
                    <Col span={18}>
                        <Form layout="vertical" onSubmit={this.createStory}>
                            <Row type="flex" justify="space-between" style={{ marginBottom: 20 }}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Add contributors">
                                        <ContributorForm />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{marginBottom: 20}}>
                                    {contributor.length !== 0 ?
                                        <ContributorList editMode='true'/> 
                                        :
                                        <Typography align="center">
                                            Contributors will show up here as you add them.
                                        </Typography>
                                    }
                                </Col>
                                <Col span={9}>
                                    <Button onClick={this.previousButton}
                                        className='create-story-nav-btn'>
                                        <Icon type="left" />
                                        Previous
                                    </Button>
                                </Col>
                                <Col span={9}>
                                    <Button type="primary"
                                        htmlType="submit"
                                        className='create-story-nav-btn'>
                                        Create Story
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
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