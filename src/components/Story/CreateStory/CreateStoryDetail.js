import React, { Component } from 'react';
import { connect } from 'react-redux';

import ImageUpload from './../../ImageUpload/ImageUpload.js';
import CreateStorySteps from './../CreateStory/CreateStorySteps.js';
import SubHeader from '../../Common/SubHeader';

import { Form, Input, Button, Avatar, Row, Col, Icon } from 'antd';
import './CreateStory.css';

class CreateStoryDetail extends Component {
    previousButton = () => {
        this.props.history.push('/choose-template/');
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    createStory = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                // variable for story data payload
                let storyData = '';

                // will create different data to send if the story statred as a template
                if (this.props.template.title !== 'initial') {
                    storyData = {
                        title: values.title,
                        header_photo: this.props.image.storyImage,
                        caption: values.caption,
                        intro: values.intro,
                        is_template: true,
                    };
                } else {
                    storyData = {
                        title: values.title,
                        header_photo: this.props.image.storyImage,
                        caption: values.caption,
                        intro: values.intro,
                        is_template: false,
                    };
                }

                // send data to the saga
                this.props.dispatch({ type: 'SET_NEW_STORY', payload: storyData });
                this.props.history.push('/choose-template/chapter/');

                // clear the fields
                this.props.form.resetFields();
            }
        });
    } // end createStory

    render() {
        const { story, image, template } = this.props;
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return (
            <div >
                <Row type='flex' align='middle' justify='center'>
                    <Col span={24}>
                        <SubHeader headerText='Fill Out Story Details' />
                    </Col>
                    <Col span={18}>
                        <CreateStorySteps current={1} />
                    </Col>
                    <Col span={18}>
                        <Form layout="vertical" onSubmit={this.createStory}>
                            <Row type="flex" justify="space-between" style={{ marginBottom: 20 }}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Story title"
                                    >
                                        {getFieldDecorator('title', {
                                            initialValue: story.title !== '' ? story.title : template.title,
                                            rules: [{ required: true, message: 'Please enter a story title!' }],
                                        })(<Input 
                                                allowClear 
                                                placeholder="Story title" />)
                                        }
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Story intro"
                                    >
                                        {getFieldDecorator('intro', {
                                            initialValue: story.intro !== '' ? story.intro : template.intro,
                                            rules: [{ required: true, message: 'Please enter an intro!' }],
                                        },
                                        )(
                                            <Input allowClear
                                                placeholder="Enter an introduction"
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Upload Story Photo">
                                        {getFieldDecorator('header_photo', {
                                            initialValue: template.placeholder_image !== '' ? template.placeholder_image : image.storyImage,
                                        },
                                        )(
                                            <div>
                                                <Avatar shape="square"
                                                    size={150}
                                                    icon='picture'
                                                    src={template.placeholder_image !== '' ? template.placeholder_image : image.storyImage}
                                                    style={{ display: 'block', margin: 'auto', marginBottom: 10 }}
                                                />
                                                <ImageUpload photoDetails={{ typeOfPhoto: 'STORY', title: "Adding Photo for New Story", buttonName: 'Add Story Photo' }} />
                                            </div>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Photo caption"
                                    >
                                        {getFieldDecorator('caption', {
                                            initialValue: story.caption !== '' ? story.caption : template.caption,
                                        },
                                        )(
                                            <Input allowClear
                                                placeholder="Add a caption for your picture"
                                            />
                                        )}
                                    </Form.Item>
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
                                        className='create-story-nav-btn'
                                        disabled={this.hasErrors(getFieldsError())}>
                                        Next
                                    <Icon type="right" />
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

const WrappedCreateStoryDetail = Form.create()(CreateStoryDetail);

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    image: reduxStore.story.imageReducer,
    template: reduxStore.template.templateNewStoryReducer,
});

export default connect(mapStoreToProps)(WrappedCreateStoryDetail);