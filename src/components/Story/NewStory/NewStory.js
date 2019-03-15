import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import ContributorPopup from './../Contributor/ContributorPopup.js';
import ImageUpload from './../../ImageUpload/ImageUpload.js';
import NewStoryChapterModal from './NewStoryChapterModal.js';
import NewStoryChapterList from './NewStoryChapterList.js';

// ant design import
import { Form, Input, Button } from 'antd';


// initial state values supposed to be used when clearing state
const initialState = { title: '',
                       intro: '',
                       header_photo: '',
                       caption: '',
                     };

class NewStory extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

    }

    // function for setting local state with user inputs
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    createStory = (event) => {
        event.preventDefault();

        // seperate files for story, chapter and contributor data sent to the redux saga
        let storyDataToSend = '';
        let chapterDataToSend = this.props.chapter;
        let contributorDataToSend = this.props.contributor;

        // will create different data to send if the story statred as a template
        if(this.props.story.title !== '') {
            storyDataToSend = { title: this.props.story.title,
                                header_photo: this.props.story.placeholder_image,
                                caption: this.props.story.caption,
                                intro: this.props.story.intro,
                                is_template: true,
                              };
        } else {
            storyDataToSend = { title: this.state.title,
                                header_photo: this.state.header_photo,
                                caption: this.state.caption,
                                intro: this.state.intro,
                                is_template: false,
                              };
        }

        // bundle the story, chapter and contributon files together and create a payload
        let completeDataToSend = { story: storyDataToSend, chapter: chapterDataToSend, contributor: contributorDataToSend };

        // send data to the saga
        this.props.dispatch({ type: 'ADD_NEW_STORY', payload: completeDataToSend });

        // clear the local state - not working properly
        this.setState(initialState);

    } // end createStory

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

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
            <Form {...formItemLayout} onSubmit={this.createStory}>
                <h2>Create a Story</h2>
                <Form.Item
                    label="Create a story or choose a template"
                >
                    <ChooseTemplate />
                </Form.Item>
                <Form.Item
                    label="Story title"
                >
                    <Input allowClear
                           placeholder={this.props.story.title !== '' ? this.props.story.title : "story title"}
                           name="title"
                           value={this.state.title}
                           onChange={this.onInputChange}
                           style={{ width: 340 }} />
                </Form.Item>
                <Form.Item
                    label="Story intro"
                >
                    <Input allowClear
                           placeholder={this.props.story.intro !== '' ? this.props.story.intro : "story introduction"}
                           name="intro"
                           onChange={this.onInputChange}
                           style={{ width: 340 }} />
                </Form.Item>
                <Form.Item
                    label="Select image"
                >
                    <ImageUpload />
                </Form.Item>
                <Form.Item
                    label="Photo caption"
                >
                   <Input allowClear
                          placeholder={this.props.story.caption !== '' ? this.props.story.caption : "add a caption" }
                          name="caption"
                          onChange={this.onInputChange} style={{ width: 340 }} />
                </Form.Item>
                <h3>Chapters</h3>
                <NewStoryChapterList />
                <Form.Item
                    label="Add a chapter"
                >
                    <NewStoryChapterModal />
                </Form.Item>
                <h3>Contributors</h3>
                <Form.Item
                    label="Add contributors"
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

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
    contributor: reduxStore.contributor.pending,
});

export default connect(mapStoreToProps)(NewStory);