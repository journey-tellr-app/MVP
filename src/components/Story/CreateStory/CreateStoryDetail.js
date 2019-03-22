import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageUpload from './../../ImageUpload/ImageUpload.js';
import CreateStorySteps from './../CreateStory/CreateStorySteps.js'

// ant design import
import { Form, Input, Button } from 'antd';

class CreateStoryDetail extends Component {

    // go bact to the previous page
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
                if(this.props.template.title !== 'initial') {
                    storyData = { title: values.title,
                                        header_photo: this.props.image.storyImage,
                                        caption: values.caption,
                                        intro: values.intro,
                                        is_template: true,
                                      };
                } else {
                    storyData = { title: values.title,
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

        const { image, template } = this.props;
        const { getFieldDecorator, getFieldsError } = this.props.form;

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
                <h2>Fill in the story details</h2>
                <CreateStorySteps current={1} />
                <Form.Item
                    label="Story title"
                    extra={template.title !== '' ? template.title : null}
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please enter a story title!' }],
                        },
                    )(
                        <Input allowClear
                               placeholder="Story title"
                               style={{ width: 340 }} 
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label="Story intro"
                    extra={template.intro !== '' ? template.intro : null}
                >
                    {getFieldDecorator('intro', {
                        rules: [{ required: true, message: 'Please enter an intro!' }],
                        }, 
                    )(
                    <Input allowClear
                           placeholder="Enter an introduction"
                           style={{ width: 340 }}
                    />
                    )}
                </Form.Item>
                <Form.Item
                    label="Select image"
                >
                    {getFieldDecorator('header_photo', {
                        initialValue: image.storyImage,
                        }, 
                    )(
                    <div>
                        { image.storyImage !== '/images/placeholder.png' ?
                        <img style={{ height: 150, width: 340 }}
                             alt="header_photo"
                             src={image.storyImage}
                        />
                        : '' }
                        <ImageUpload photoDetails={{typeOfPhoto:'STORY', title: "Add story picture"}}/>
                    </div>
                    )}
                </Form.Item>

                <Form.Item
                    label="Photo caption"
                    extra={template.caption !== '' ? template.caption : null}
                >
                    {getFieldDecorator('caption'
                    )(
                   <Input allowClear
                          placeholder="Add a caption for your picture"
                          style={{ width: 340 }} 
                    />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                            htmlType="submit"
                            disabled={this.hasErrors(getFieldsError())}
                    >
                        Next
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.previousButton}>
                        Previous
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}

const WrappedCreateStoryDetail = Form.create()(CreateStoryDetail);

const mapStoreToProps = reduxStore => ({
    image: reduxStore.story.imageReducer,
    template: reduxStore.template.templateNewStoryReducer,
});

export default connect(mapStoreToProps)(WrappedCreateStoryDetail);