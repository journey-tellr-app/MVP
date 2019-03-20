import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import ContributorPopup from './../Contributor/ContributorPopup.js';
import ImageUpload from './../../ImageUpload/ImageUpload.js';
import ChapterList from '../Chapter/ChapterList.js';
import AddChapter from '../Chapter/AddChapter.js';

// ant design import
import { Form, Input, Button, Divider } from 'antd';

class NewStoryForm extends Component {

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    createStory = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                console.log(values);

                // seperate files for story, chapter and contributor data sent to the redux saga
                let storyDataToSend = '';
                let chapterDataToSend = this.props.chapter;
                let contributorDataToSend = this.props.contributor;

                // will create different data to send if the story statred as a template
                if(this.props.story.title !== '') {
                    storyDataToSend = { title: values.title,
                                        header_photo: values.header_photo,
                                        caption: values.caption,
                                        intro: values.intro,
                                        is_template: true,
                                      };
                } else {
                    storyDataToSend = { title: values.title,
                                        header_photo: values.header_photo,
                                        caption: values.caption,
                                        intro: values.intro,
                                        is_template: false,
                                      };
                }

                // bundle the story, chapter and contributon files together and create a payload
                let completeDataToSend = { story: storyDataToSend, chapter: chapterDataToSend, contributor: contributorDataToSend };

                // send data to the saga
                this.props.dispatch({ type: 'ADD_NEW_STORY', payload: completeDataToSend });

                // clear the fields
                this.props.form.resetFields();

            }
        });
    } // end createStory

    render() {

        const { story, chapter, image } = this.props;
        const { getFieldDecorator } = this.props.form;

        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 8 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 },
        //     },
        // };

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
                <Divider><h2 align='center'>Create a Story</h2></Divider>
                <Form.Item
                    label="Create a story or choose a template"
                >
                    <ChooseTemplate />
                </Form.Item>
                <Form.Item
                    label="Story title"
                >
                    {getFieldDecorator('title', {
                        initialValue: story.title,
                        rules: [{ required: true, message: 'Please enter a story title!' }],
                        },
                    )(
                        <Input allowClear
                               placeholder={story.title !== '' ? story.title : "story title"}
                               style={{ width: 340 }} 
                        />
                    )}
                </Form.Item>
                <Form.Item
                    label="Story intro"
                >
                    {getFieldDecorator('intro', {
                        initialValue: story.intro,
                        rules: [{ required: true, message: 'Please enter an intro!' }],
                        }, 
                    )(
                    <Input allowClear
                           placeholder={story.intro !== '' ? story.intro : "story introduction"}
                           style={{ width: 340 }}
                    />
                    )}
                </Form.Item>
                <Form.Item
                    label="Select image"
                >
                    {/* Image Upload not currently working */}
                    {getFieldDecorator('header_photo', {
                        initialValue: image.storyImage,
                        }, 
                    )(
                    <div>
                        <img style={{ height: 150, width: 340 }}
                             alt="header_photo"
                             src={image.storyImage}
                        />
                        <ImageUpload photoDetails={{typeOfPhoto:'STORY', title: "Add story picture"}}/>
                    </div>
                    )}
                </Form.Item>

                <Form.Item
                    label="Photo caption"
                >
                    {getFieldDecorator('caption', {
                        initialValue: story.caption,
                        rules: [{ required: true, message: 'Please enter a caption!' }],
                        },
                    )(
                   <Input allowClear
                          placeholder={story.caption !== '' ? story.caption : "add a caption" }
                          style={{ width: 340 }} 
                    />
                    )}
                </Form.Item>
                <h3>Chapters</h3>
                {chapter.length !== 0 ? <ChapterList chapter={chapter} /> : ''}
                <Form.Item
                    // label="Add a chapter"
                >
                    <AddChapter chapter={chapter} storyId="new" />
                </Form.Item>
                <h3>Contributors</h3>
                <Form.Item
                    // label="Add contributors"
                >
                    <ContributorPopup />
                </Form.Item>
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

const WrappedNewStoryForm = Form.create()(NewStoryForm);

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
    contributor: reduxStore.contributor.pending,
    image: reduxStore.story.imageReducer
});

export default connect(mapStoreToProps)(WrappedNewStoryForm);