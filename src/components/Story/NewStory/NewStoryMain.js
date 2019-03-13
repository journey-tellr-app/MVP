import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import NewStoryChapter from './NewStoryChapter.js';
import TemplateChapter from './TemplateChapter.js';
import ContributorPopup from './../Contributor/ContributorPopup.js';

// ant design import
import { Form, Input, Icon, Button } from 'antd';

const initialState = { title: '',
                       header_photo: '',
                       caption: '',
                     };

class NewStoryMain extends Component {
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

    createStory = (event) => {
        // event.preventDefault();
        // add fields to the reducer
        let storyDataToSend = '';
        let chapterDataToSend = this.props.chapter;
        let contributorDataToSend = this.props.contributor;

        if(this.props.story.title != '') {
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
                                intro: '',
                                is_template: false,
                              };
        }

        console.log(contributorDataToSend);
        let completeDataToSend = { story: storyDataToSend, chapter: chapterDataToSend, contributor: contributorDataToSend };

        this.props.dispatch({ type: 'ADD_NEW_STORY', payload: completeDataToSend });
        this.setState(initialState);
    }

    render() {

        return (
            <div>
                <h2>Create a Story</h2>
                <ChooseTemplate />
                {this.props.story.title != '' ? <Input placeholder={this.props.story.title} allowClear name="title" onChange={this.onInputChange} style={{ width: 340 }} /> : <Input placeholder="story title" name="title" allowClear onChange={this.onInputChange} style={{ width: 340 }} />}
                <h4>Image goes here</h4>
                {this.props.story.title != '' ? <Input placeholder={this.props.story.caption} allowClear name="caption" onChange={this.onInputChange} style={{ width: 340 }} /> :<Input placeholder="add a caption" name="caption" allowClear onChange={this.onInputChange} style={{ width: 340 }} />}
                {/* {this.props.chapter.length > 0 ? <TemplateChapter chapter={this.props.chapter} /> : <NewStoryChapter />} */}
                <h3>Add chapter</h3>
                <NewStoryChapter />
                <ContributorPopup />
                <Button onClick={this.createStory}>Create Story</Button>
            </div>
        )
    }

}

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
    contributor: reduxStore.contributor.pending,
});

export default connect(mapStoreToProps)(NewStoryMain);